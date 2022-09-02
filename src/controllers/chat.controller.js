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
        const {mem_no, partner_mem_no} = req.param;

        if (!mem_no) {
            return res.send(errResponse(baseResponseStatus.USER_USERIDX_EMPTY));
        } else if (mem_no < 1) {
            return res.send(errResponse(baseResponseStatus.USER_USERIDX_LENGTH));
        } else if (!partner_mem_no) {
            return res.send(errResponse(baseResponseStatus.USER_USERIDX_EMPTY));
        } else if (partner_mem_no < 1) {
            return res.send(errResponse(baseResponseStatus.USER_USERIDX_LENGTH));
        }
 
        const userChats = await this.ChatService.retrieveUserChats(mem_no, partner_mem_no);

        return res.send(userChats);
    }

    postChat = async (req, res) => {
        const partner_mem_no = req.param.partner_mem_no;
        const content = req.body.content;

        if (!content){
            return res.send(errResponse(baseResponseStatus.MESSAGE_CONTENT_EMPTY));
        } else if (content < 100){
            return res.send(errResponse(baseResponseStatus.MESSAGE_CONTENT_LENGTH));
        }

        if (!partner_mem_no) {
            return res.send(errResponse(baseResponseStatus.USER_USERIDX_EMPTY));
        } else if (partner_mem_no < 1) {
            return res.send(errResponse(baseResponseStatus.USER_USERIDX_LENGTH));
        }
 
        const postedUserChat = await this.ChatService.createUserChat(partner_mem_no, content);

        return res.send(postedUserChat);
    }
}

module.exports = ChatController;
