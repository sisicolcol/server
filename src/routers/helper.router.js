const HelperController = require('../controllers/helper.controller');

const helperRouter = (router) => {
    this.HelperController = new HelperController();

    //퀵 활동 지원 서비스) 목록 조회하기
    router.get('/apply/quick/',this.HelperController.getQuickList);

    //사전예약 활동 지원 서비스) 목록 조회하기
    router.get('/apply/pre/',this.HelperController.getPreList);

    //나의 지원 목록) 조회하기
    router.get('/helper/:hp_id',this.HelperController.getMyApply);

    //나의 지원 목록) 메모 보기
    router.get('/hp_memo/:hp_id/:apply_id',this.HelperController.memoCont);

    //나의 지원 목록) 메모 수정하기
    router.post('/hp_memo/:hp_id/:apply_id',this.HelperController.memoUpCont);
    
}

module.exports = helperRouter;