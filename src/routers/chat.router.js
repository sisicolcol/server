
const ChatController = require('../controllers/chat.controller');

const chatRouter = (router) => {

    this.ChatController = new ChatController();

    // 내 채팅 목록 가지고 오기
    router.get('/chat/list:mem_no', this.ChatController.getMyChatLists );
    
    // 채팅방 속 채팅 내역 전체 조회
    router.get('/chat/:mem_no', this.ChatController.getMyChatLists );

}

module.exports = chatRouter;
