const ChatService = require('../services/chat.service');
const baseResponseStatus = require('../utilities/baseResponseStatus');
const { errResponse } = require('../utilities/response');

class ChatController {
    ChatService;

    constructor() {
        this.ChatService = new ChatService();
    }

    // 채팅 목록 가지고 오기
    getMyChatRooms = async (req, res) =>  {
        
        // 임시로 사용자 인덱스 parameter로 받아오는걸로 받아둠..
        const mem_no = req.param.mem_no;

        if (!mem_no){
            return res.send(errResponse(baseResponseStatus.USER_USERIDX_EMPTY));
        } else if (mem_no < 1){
            return res.send(errResponse(baseResponseStatus.USER_USERID_LENGTH));
        }

        const retrieveChatList = await this.ChatService.retrieveChatRooms(mem_no);
    
        return res.send(retrieveChatList);
    }

    getChats = async (req, res) => {
        // 임시로 사용자 인덱스 parameter로 받아오는걸로 받아둠..
        // const chat_room_no = req.param.chat_room_no;

        // if (!chat_room_no) {
        //     return res.send(errResponse(baseResponseStatus.CHAT_CHATROOM_EMPTY));
        // } else if (chat_room_no < 1) {
        //     return res.send(errResponse(baseResponseStatus.CHAT_CHATROOM_LENGTH));
        // }
 
        // const userChats = await this.ChatService.retrieveUserChats(chat_room_no);

        // return res.send(userChats);
    }

    postChat = async (req, res) => {

    }
}

module.exports = ChatController;
