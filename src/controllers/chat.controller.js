const ChatService = require('../services/chat.service');
const baseResponseStatus = require('../utilities/baseResponseStatus');
const { errResponse } = require('../utilities/response');

class ChatController {
    ChatService;

    constructor() {
        this.ChatService = new ChatService();
    }

    // 채팅 목록 가지고 오기
    getMyChatLists = async (req, res) =>  {
        
        // jwt 미들웨어에서 가지고 오나?
        const member_no = req.body.userIdx;

        if (!member_no){
            return res.send(errResponse(baseResponseStatus.MESSAGE_USERIDX_EMPTY));
        } else if (member_no < 1){
            return res.send(errResponse(baseResponseStatus.MESSAGE_USERIDX_LENGTH));
        }

        const retrieveChatList = await this.ChatService.retrieveChatList(member_no);
    
        return res.send(retrieveChatList);
    }

    // 채팅 전송하기
    // postChat = async (req, res) => {
        
    //     const { member_no, recieve_user_no, content} = req.body;

    //     if (!member_no){
    //         return res.send(errResponse(baseResponseStatus.MESSAGE_USERIDX_EMPTY));
    //     } else if (member_no < 1){
    //         return res.send(errResponse(baseResponseStatus.MESSAGE_USERIDX_LENGTH));
    //     }

    //     if (!recieve_user_no){
    //         return res.send(errResponse(baseResponseStatus.MESSAGE_USERIDX_EMPTY));
    //     } else if (recieve_user_no < 1){
    //         return res.send(errResponse(baseResponseStatus.MESSAGE_USERIDX_LENGTH));
    //     }

    //     if (!content){
    //         return res.send(errResponse(baseResponseStatus.MESSAGE_CONTENT_EMPTY));
    //     }

    //     const insertChat = await this.ChatService.createChat(member_no, recieve_user_no, content);

    //     return res.send(insertChat);
    // }

    // // 특정 상대와의 채팅 목록 가져오기
    // getChats = async (req, res) => {

    //     const chat_room_no = req.body.chat_room_no;

    //     if (!chat_room_no){
    //         return res.send(errResponse(baseResponseStatus.MESSAGE_USERIDX_EMPTY));
    //     } else if (chat_room_no < 1){
    //         return res.send(errResponse(baseResponseStatus.MESSAGE_USERIDX_LENGTH));
    //     }

    //     const insertChat = await this.ChatService.retrieveUserChats(chat_room_no);

    //     return res.send(insertChat);
    // }
}

module.exports = ChatController;
