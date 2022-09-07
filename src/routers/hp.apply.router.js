const HpApplyController = require('../controllers/hp.apply.controller');

const hpApplyRouter = (router)=>{

    this.HpApplyController = new HpApplyController();

    // 헬퍼 퀵/사전 활동 지원 서비스) 지원하기 -기존 자기소개서 보기
    router.get('/hp/apply/:hp_id', this.HpApplyController.getHpApply);

    // 헬퍼 지원 완료하기 -> 지원한 신청서의 시간까지 post
    router.post('/hp/apply',this.HpApplyController.postHpApply);

    // 헬퍼 마이페이지) 기존 자기소개서 가져오기
    router.get('/hp/preidc/:hp_id',this.HpApplyController.getHpPreIdc);

    // 헬퍼 마이페이지) 기존 자기소개서 insert or update
    router.post('/hp/preidc',this.HpApplyController.postHpPreIdc);

}

module.exports = hpApplyRouter;