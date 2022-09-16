const ApplyController = require('../controllers/apply.controller');
const jwt_middleware = require('../middlewares/jwt.middleware');
const applyRouter = (router)=>{

    this.ApplyController = new ApplyController();

    //Test용
    router.get('/test',this.ApplyController.makeP);

    // 시각장애인 지원 전체 정보 보기
    router.get('/user/apply',[jwt_middleware], this.ApplyController.getApplyList);

    // 시각장애인 활동지원 서비스 신청하기
    router.post('/user/apply',this.ApplyController.postApply);

    // 신청목록) mem_id에 따라 조회하기
    router.get('/user/applylist/:mem_id',this.ApplyController.getApplyByMemId);

    // 신청목록) 자세한 신청 내용 보기
    router.get('/user/apply/detail/:apply_id',this.ApplyController.getApplyDetail);

    // 신청 목록) 매칭 헬퍼 목록 조회하기
    router.get('/user/match/:apply_id',this.ApplyController.getHelperList);

    //신청 목록) 매칭 헬퍼 이력서 조회하기
    router.get('/user/resume/:hp_id',this.ApplyController.getHelperResume);

    //지원한 헬퍼) 목록 조회하기
    router.get('/user/helperlist/:mem_id',this.ApplyController.getHelperListByMemId);

    //지원한 헬퍼) 수락하기/거절하기
    router.post('/user/helper/accept', this.ApplyController.UpdateAccpet);

    //활동지원 서비스 완료
    router.post('/user/success', this.ApplyController.finishApply);

    //활동지원 서비스 완료
    router.post('/user/fail', this.ApplyController.failApply);

    //신청목록) 메모 보기
    router.get('/memo/:apply_id',this.ApplyController.memoCont);

    //신청 목록) 메모 수정하기
    router.post('/memo/:apply_id',this.ApplyController.memoUpCont);
    
}

module.exports = applyRouter;