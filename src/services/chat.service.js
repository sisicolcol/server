
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

    retrieveChatList = async (member_no) => { 
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

    // createChat = async(user_no, parnter_no) => {
    //     const connection = await pool.getConnection(async (connection) => connection);
    //     try {
    //         const checkRoomExistParm = [user_no, parnter_no, partner_no, user_no];
    //         const roomExistResult = await this.ChatRepository.checkRoomExists(connection, checkRoomExistParm);

    //         if (roomExistResult[0] == null){
    //             await this.ChatRoomRepository.insertRoom(connection, user_no, parnter_no);
    //         }

    //         const checkList = await this.ChatroomRepository.insertChatRoom(connection, member_no);

    //         connection.release();

    //         return checkList;
    //     } catch (err) {
    //         console.log(err);

    //         return errResponse();
    //     }
    // }

    // retrieveUserChats = async () => {
    //     const connection = await pool.getConnection(async (connection) => connection);
    //     try {

    //         const checkList = await this.ChatRepository.selectUserChats(member_no);

    //         connection.release();

    //         return checkList;
    //     } catch (err) {
    //         console.log(err);

    //         return errResponse();
    //     }  
    // }
}

module.exports = ChatService;
