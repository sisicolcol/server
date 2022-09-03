
const { pool } = require('../config/db');

const MessageRepository = require('../repositorys/message.repository');
const ChatroomRepository = require('../repositorys/room.repository');
const baseResponseStatus = require('../utilities/baseResponseStatus');

const { errResponse } = require('../utilities/response');

class ChatService {
    MessageRepository;
    ChatroomRepository;

    constructor() {
        this.MessageRepository = new MessageRepository();
        this.ChatroomRepository = new ChatroomRepository();
    }

    retrieveChatRooms = async (member_no) => { 
        const connection = await pool.getConnection(async (connection) => connection);
        try {
            const checkList = await this.MessageRepository.selectUserChatRooms(connection, member_no);

            connection.release();

            return checkList;
        } catch (err) {
            console.log(err);

            return errResponse(baseResponseStatus.DB_ERROR);
        }
    }

    retrieveUserChats = async (mem_no, partner_mem_no) => {
        const connection = await pool.getConnection(async (connection) => connection);
        try {
            const checkList = await this.ChatroomRepository.selectUserChatRooms(connection, mem_no, partner_mem_no);

            const userChats = await this.MessageRepository.selectUserChats(connection, checkList[0]);

            connection.release();

            return userChats;
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

            return insertChatResult;
        } catch (err) {
            console.log(err);

            return errResponse(baseResponseStatus.DB_ERROR);
        }
    }

}

module.exports = ChatService;
