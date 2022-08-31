
const ChatController = require('../controllers/chat.controller');

const chatRouter = (router) => {

    this.ChatController = new ChatController();

    // 내 채팅 목록 가지고오기
    router.get('/chat/list', this.ChatController.getMyChatLists );


}

module.exports = chatRouter;
