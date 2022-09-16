
const { pool } = require('../config/db');

const MessageRepository = require('../repositorys/message.repository');
const ChatroomRepository = require('../repositorys/room.repository');
const MemberRepository = require('../repositorys/member.repository');
const ApplyRepository = require('../repositorys/apply.repository');

const baseResponseStatus = require('../utilities/baseResponseStatus');
const { errResponse, response } = require('../utilities/response');

class ChatService {
    MessageRepository;
    ChatroomRepository;
    MemberRepository;
    ApplyRepository;


    constructor() {
        this.MessageRepository = new MessageRepository();
        this.ChatroomRepository = new ChatroomRepository();
        this.MemberRepository = new MemberRepository();
        this.ApplyRepository = new ApplyRepository();
    }

    // 채팅방 목록 가져오기
    retrieveChatRooms = async (mem_id) => { 
        const connection = await pool.getConnection(async (connection) => connection);
        try {

            const memberIdx = await this.MemberRepository.selectMemberIdxById(connection, mem_id);

            let member_no;
            if ( memberIdx[0] !== undefined ) {
                member_no = memberIdx[0].mem_no;
            }

            // 채팅방 조회 리스트
            let checkList = await this.MessageRepository.selectUserChatRooms(connection, member_no);

            const checkedUserType = await this.MemberRepository.selectUserType(connection, member_no);

            // 상대방 식별자 담아둘 곳
            let parnterIdxList = [];
            // 시각장애인 사용자일때
            if (checkedUserType[0].mem_type == 0) {
                for (let i = 0; i < checkList.length; i += 1) {
                    parnterIdxList.push(checkList[i].helper_no);
                }
            }
            // 헬퍼 사용자일때
            if (checkedUserType[0].mem_type == 1)  {
                for (let i = 0; i < checkList.length; i += 1) {
                    parnterIdxList.push(checkList[i].blind_user_no);
                }
            }
            console.log(parnterIdxList);
            // 사용자의 이름
            const userName = await this.MemberRepository.selectMemberIdByIdx(connection, member_no);

            // 상대방 이름을 가지고 와 리스트로 저장
            let partnerNamesList=[];
            for (let i = 0; i < checkList.length; i += 1) {
                let name = await this.MemberRepository.selectMemberIdByIdx(connection, parnterIdxList[i]);
                partnerNamesList.push(name[0].mem_id);
            }

            // 가져온 채팅방 리스트에 apply_id 생성
            for (let i = 0; i < partnerNamesList.length; i += 1) {
                let selectedApplyIdResult = await this
                                                    .ApplyRepository
                                                    .selectActiveApplyIdByUserNames(connection, userName[0].mem_id, partnerNamesList[i]);
                if (selectedApplyIdResult[0] !== undefined) {
                    checkList[i].apply_id = selectedApplyIdResult[0].apply_id
                };
            }
            
            connection.release();

            return response(baseResponseStatus.SUCCESS, { mem_type: checkedUserType[0].mem_type, "mem_no" : member_no ,checkList });
        } catch (err) {
            console.log(err);

            return errResponse(baseResponseStatus.DB_ERROR);
        }
    }

    // 채팅 내역 가져오기
    retrieveUserChats = async (mem_no, partner_mem_no, apply_id) => {
        const connection = await pool.getConnection(async (connection) => connection);
        try {
            console.log(mem_no, partner_mem_no);
            const checkList = await this.ChatroomRepository.selectUserChatRooms(connection, mem_no, partner_mem_no);

            if (checkList[0] == undefined) {
                return errResponse(baseResponseStatus.CHAT_CHATROOM_EMPTY);
            }

            const partnerName = await this.MemberRepository.selectUserNameByIndex(connection, partner_mem_no);
            const userType = await this.MemberRepository.selectUserTypeByIndex(connection, mem_no);
            const applyInfo = await this.ApplyRepository.selectApplyInfo(connection, apply_id);

            const matchTimeInfo = applyInfo[0].서비스일시;

            const month = String(matchTimeInfo.getMonth()+1);
            const day = String(matchTimeInfo.getDate());
            const time = String(matchTimeInfo).substring(16, 21);
            
            let introduce = ``;

            // 헬퍼 사용자일 경우 추가
            if (userType[0].mem_type == 0) introduce += `${partnerName[0].mem_name}님께서 헬퍼님의 활동지원 서비스를 승인하셨습니다. 아래 버튼을 눌러서 자세한 서비스 내용을 확인해보세요`;
            // 시각장애인 사용자일 경우 추가
            if (userType[0].mem_type == 1) introduce += `${month}월 ${day}일 ${time}에 신청한 활동지원서비스에 대해 매칭된 헬퍼입니다. 시시콜콜은 서비스 신청 이후 사용자간 소통으로 변경된 사항에 대해서 책임을 지지 않습니다. 사전에 약속된 내용을 엄수해주시길 바랍니다.`;
            
            const userChats = await this.MessageRepository.selectUserChats(connection, checkList[0].chat_room_no);

            connection.release();

            return response(baseResponseStatus.SUCCESS, {
                "chat_room_no" : checkList[0].chat_room_no, 
                "partner_no": partnerName[0].mem_name,
                "info" : {
                "date" : `${month}월 ${day}일 ${time}`,
                "departure" : applyInfo[0].출발지,
                "destination" : applyInfo[0].목적지, 
            },
                "introduce": introduce,
                "chats" : userChats
            });
        } catch (err) {
            console.log(err);

            return errResponse(baseResponseStatus.DB_ERROR);
        }
    }

    // 채팅 보내기
    createUserChat = async (chat_room_no, me_mem_no, partner_mem_no, content) => {
        const connection = await pool.getConnection(async (connection) => connection);
        try {
            await this.MessageRepository.insertUserChat(connection, chat_room_no, me_mem_no, partner_mem_no, content);

            connection.release();

            return response(baseResponseStatus.SUCCESS);
        } catch (err) {
            console.log(err);

            return errResponse(baseResponseStatus.DB_ERROR);
        }
    }

}

module.exports = ChatService;
