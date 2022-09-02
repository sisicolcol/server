
const MessageController = require('../controllers/message.controller');

const messageRouter = (router) => {

    this.MessageController = new MessageController();

    // 내 채팅 목록 가지고 오기
    router.get('/chat/list:mem_no', this.MessageController.getMyChatRooms );
    
    // 채팅방 속 채팅 내역 전체 조회
    router.get('/chat/:chat_room_no', this.MessageController.getChats );

    // 상대방에게 채팅 전송
    router.post('/chat/:chat_room_no:mem_no', this.MessageController.postChat );
    
}

module.exports = messageRouter;
