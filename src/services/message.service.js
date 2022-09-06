
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
    retrieveChatRooms = async (member_no) => { 
        const connection = await pool.getConnection(async (connection) => connection);
        try {
            const checkList = await this.MessageRepository.selectUserChatRooms(connection, member_no);

            connection.release();

            return response(baseResponseStatus.SUCCESS, checkList);
        } catch (err) {
            console.log(err);

            return errResponse(baseResponseStatus.DB_ERROR);
        }
    }

    // 채팅 내역 가져오기
    retrieveUserChats = async (mem_no, partner_mem_no, apply_id) => {
        const connection = await pool.getConnection(async (connection) => connection);
        try {

            const checkList = await this.ChatroomRepository.selectUserChatRooms(connection, mem_no, partner_mem_no);
            const partnerName = await this.MemberRepository.selectUserNameByIndex(connection, partner_mem_no);
            const userType = await this.MemberRepository.selectUserTypeByIndex(connection, mem_no);
            const applyInfo = await this.ApplyRepository.selectApplyInfo(connection, apply_id);

            const matchTimeInfo = applyInfo[0].서비스일시;

            const month = String(matchTimeInfo.getMonth()+1);
            const day = String(matchTimeInfo.getDate());
            const time = String(matchTimeInfo).substring(16, 21);
            
            let introduce = ``;

            // 헬퍼 사용자일 경우 추가
            if (userType[0].mem_type == 0) introduce += `${partnerName[0].mem_name} 님께서 헬퍼님의 활동지원 서비스를 승인하셨습니다. 아래 버튼을 눌러서 자세한 서비스 내용을 확인해보세요`;
            // 시각장애인 사용자일 경우 추가
            if (userType[0].mem_type == 1) introduce += `${month}월 ${day}일 ${time}에 신청한 활동지원서비스에 대해 매칭된 헬퍼입니다. 시시콜콜은 서비스 신청 이후 사용자간 소통으로 변경된 사항에 대해서 책임을 지지 않습니다. 사전에 약속된 내용을 엄수해주시길 바랍니다.`;
            
            const userChats = await this.MessageRepository.selectUserChats(connection, checkList[0].chat_room_no);

            connection.release();

            return response(baseResponseStatus.SUCCESS, {
                "chat_room_no" : checkList[0].chat_room_no, 
                "대화 상대": partnerName[0].mem_name,
                "서비스 주요 사항" : {
                "서비스 일시" : `${month}월 ${day}일 ${time}`,
                "출발지" : applyInfo[0].출발지,
                "목적지" : applyInfo[0].목적지, 
            },
                "시작 메시지 ": introduce,
                "채팅 목록" : userChats
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
