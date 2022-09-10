const memberController = require('../controllers/member.controller');

const memberRouter = (router) => {
    this.memberController = new memberController();

    router.post('/auth/signup',this.memberController.signupCont);

    //로그인
    router.post('/auth/login',this.memberController.loginCont);
}

module.exports = memberRouter;