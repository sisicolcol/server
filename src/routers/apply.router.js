const ApplyController = require('../controllers/apply.controller');

const applyRouter = (router)=>{

    this.ApplyController = new ApplyController();

    // 시각장애인 지원 전체 정보 보기
    router.get('/user/apply', this.ApplyController.getApplyList);
}

module.exports = applyRouter;