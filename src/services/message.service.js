
const { pool } = require('../config/db');

const MessageRepository = require('../repositorys/message.repository');
const ChatroomRepository = require('../repositorys/room.repository');
const MemberRepository = require('../repositorys/member.repository');

const baseResponseStatus = require('../utilities/baseResponseStatus');
const { errResponse, response } = require('../utilities/response');

class ChatService {
    MessageRepository;
    ChatroomRepository;
    MemberRepository;

    constructor() {
        this.MessageRepository = new MessageRepository();
        this.ChatroomRepository = new ChatroomRepository();
        this.MemberRepository = new MemberRepository();
    }

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

    retrieveUserChats = async (mem_no, partner_mem_no) => {
        const connection = await pool.getConnection(async (connection) => connection);
        try {
            const checkList = await this.ChatroomRepository.selectUserChatRooms(connection, mem_no, partner_mem_no);
            const partnerName = await this.MemberRepository.selectUserNameByIndex(connection, partner_mem_no);

            console.log(checkList[0].chat_room_no);
            const userChats = await this.MessageRepository.selectUserChats(connection, checkList[0].chat_room_no);

            connection.release();

            return response(baseResponseStatus.SUCCESS, { 
                "채팅방 식별자" : checkList[0].chat_room_no, 
                "대화 상대": partnerName[0].mem_name, 
                userChats
            });
        } catch (err) {
            console.log(err);

            return errResponse(baseResponseStatus.DB_ERROR);
        }
    }

    createUserChat = async (chat_room_no, me_mem_no, partner_mem_no, content) => {
        const connection = await pool.getConnection(async (connection) => connection);
        try {
            const insertChatResult = await this.MessageRepository.insertUserChat(connection, chat_room_no, me_mem_no ,partner_mem_no, content);
            connection.release();

            return response(baseResponseStatus.SUCCESS);
        } catch (err) {
            console.log(err);

            return errResponse(baseResponseStatus.DB_ERROR);
        }
    }

    retrieveChatInfo = async () => {
        const connection = await pool.getConnection(async (connection) => connection);
        try {

            const helloMessage = await this.MessageRepository.insertUserChat(connection, );

            connection.release();

            return insertChatResult;
        } catch (err) {
            console.log(err);

            return errResponse(baseResponseStatus.DB_ERROR);
        }
    }

}

module.exports = ChatService;
