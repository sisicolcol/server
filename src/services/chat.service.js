
const { pool } = require('../config/db');

const ChatRepository = require('../repositorys/chat.repository');
const ChatroomRepository = require('../repositorys/room.repository');
const baseResponseStatus = require('../utilities/baseResponseStatus');

const { errResponse } = require('../utilities/response');

class ChatService {
    ChatRepository;
    ChatroomRepository;

    constructor() {
        this.ChatRepository = new ChatRepository();
        this.ChatroomRepository = new ChatroomRepository();
    }

    retrieveChatRooms = async (member_no) => { 
        const connection = await pool.getConnection(async (connection) => connection);
        try {
            const checkList = await this.ChatRepository.selectUserChatRooms(connection, member_no);

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

            const userChats = await this.ChatRepository.selectUserChats(connection, checkList[0]);

            connection.release();

            return userChats;
        } catch (err) {
            console.log(err);

            return errResponse(baseResponseStatus.DB_ERROR);
        }
    }


    createUserChat = async (mem_no, content) => {
        const connection = await pool.getConnection(async (connection) => connection);
        try {
            const insertChatResult = await this.

            connection.release();

            return userChats;
        } catch (err) {
            console.log(err);

            return errResponse();
        }
    }
}

module.exports = ChatService;