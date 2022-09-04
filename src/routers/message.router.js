
const MessageController = require('../controllers/message.controller');

const messageRouter = (router) => {

    this.MessageController = new MessageController();

    // 내 채팅 목록 가지고 오기
    router.get('/chat/list', this.MessageController.getMyChatRooms );
    
    // 채팅방 속 채팅 내역 전체 조회
    router.get('/chat', this.MessageController.getChats );

    // 상대방에게 채팅 전송
    router.post('/chat', this.MessageController.postChat );
    
}

module.exports = messageRouter;
