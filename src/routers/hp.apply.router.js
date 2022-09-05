const HpApplyController = require('../controllers/hp.apply.controller');

const hpApplyRouter = (router)=>{

    this.HpApplyController = new HpApplyController();

    // 헬퍼 퀵/사전 활동 지원 서비스) 지원하기 -기존 자기소개서 보기
    router.get('/hp/apply/:hp_id', this.HpApplyController.getHpApply);

    // 헬퍼 지원 완료하기 -> 지원한 신청서의 시간까지 post
    router.post('/hp/apply',this.HpApplyController.postHpApply);

    // 헬퍼 지원 목록) pg_id 내림차순 (업로드 순)
    router.get('/hp/applylist/:hp_id',this.HpApplyController.getHpApplyList);

    // 헬퍼 지원 목록) 공고 자세히 보기
    router.get('/hp/apply/detail/:apply_id',this.HpApplyController.getHpApplyDetail);

    // 헬퍼 마이페이지) 프로필 및 자기소개서 설정
    router.post('/hp/setprofile',this.HpApplyController.postHpProfile);

}

module.exports = hpApplyRouter;