const memberController = require('../controllers/member.controller');

const memberRouter = (router) => {
    this.memberController = new memberController();

    router.post('/auth/signup',this.memberController.signupCont);
}

module.exports = memberRouter;