const HelperController = require('../controllers/helper.controller');

const helperRouter = (router) => {
    this.HelperController = new HelperController();

    //퀵 활동 지원 서비스) 목록 조회하기
    router.get('/apply/quick/',this.HelperController.getQuickList);

    //사전예약 활동 지원 서비스) 목록 조회하기
    router.get('/apply/pre/',this.HelperController.getPreList);

}

module.exports = helperRouter;