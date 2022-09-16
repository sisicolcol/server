const MessageService = require('../services/message.service');
const baseResponseStatus = require('../utilities/baseResponseStatus');
const { errResponse } = require('../utilities/response');

class MessageController {
    MessageService;

    constructor() {
        this.MessageService = new MessageService();
    }

    // 채팅 목록 가지고 오기
    getMyChatRooms = async (req, res) =>  {
        
        // 임시로 사용자 인덱스 parameter로 받아오는걸로 받아둠..
        const mem_id = req.query.mem_id;

        if (!mem_id){
            return res.send(errResponse(baseResponseStatus.USER_USERID_EMPTY));
        } else if (mem_id < 1){
            return res.send(errResponse(baseResponseStatus.USER_USERID_LENGTH));
        }

        const retrieveChatList = await this.MessageService.retrieveChatRooms(mem_id);
    
        return res.send(retrieveChatList);
    }


    getChats = async (req, res) => {
        // 임시로 사용자 인덱스 parameter로 받아오는걸로 받아둠..
        const {mem_no, partner_mem_no, apply_id} = req.query;

        if (!mem_no) {
            return res.send(errResponse(baseResponseStatus.USER_USERIDX_EMPTY));
        } else if (mem_no < 1) {
            return res.send(errResponse(baseResponseStatus.USER_USERIDX_LENGTH));
        } else if (!partner_mem_no) {
            return res.send(errResponse(baseResponseStatus.USER_USERIDX_EMPTY));
        } else if (partner_mem_no < 1) {
            return res.send(errResponse(baseResponseStatus.USER_USERIDX_LENGTH));
        }
 
        const userChats = await this.MessageService.retrieveUserChats(mem_no, partner_mem_no, apply_id);

        return res.send(userChats);
    }

    postChat = async (req, res) => {
        const { chat_room_no, me_mem_no, partner_mem_no} = req.query;
        const content = req.body.content;

        if (!content){
            return res.send(errResponse(baseResponseStatus.MESSAGE_CONTENT_EMPTY));
        } else if (content < 100){
            return res.send(errResponse(baseResponseStatus.MESSAGE_CONTENT_LENGTH));
        }

        if (!me_mem_no) {
            return res.send(errResponse(baseResponseStatus.USER_USERIDX_EMPTY));
        } else if (me_mem_no < 1) {
            return res.send(errResponse(baseResponseStatus.USER_USERIDX_LENGTH));
        }

        if (!partner_mem_no) {
            return res.send(errResponse(baseResponseStatus.USER_USERIDX_EMPTY));
        } else if (partner_mem_no < 1) {
            return res.send(errResponse(baseResponseStatus.USER_USERIDX_LENGTH));
        }
 
        const postedUserChat = await this.MessageService.createUserChat(chat_room_no, me_mem_no, partner_mem_no, content);

        return res.send(postedUserChat);
    }
}

module.exports = MessageController;
