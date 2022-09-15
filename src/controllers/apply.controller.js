const ApplyService = require('../services/apply.service');

const baseResponse = require('../utilities/baseResponseStatus');
const { errResponse, response } = require('../utilities/response');

class ApplyController {
    ApplyService;

    constructor(){
        this.ApplyService = new ApplyService();
    }

    //Test용
    makeP = async (req,res)=>{
        const retrieveApplyResult = await this.ApplyService.makeTableS();

        return res.send(retrieveApplyResult);
    }

    getApplyList = async (req,res)=>{
        const retrieveApplyResult = await this.ApplyService.retrieveApplyList();

        return res.send(retrieveApplyResult);
    }

    postApply = async(req,res)=>{
        const {service_time,start_point,end_point,duration,way,service_date,contents,details,mem_id} = req.body;

        const createdApplyResult = await this.ApplyService.createApply(
            service_time,start_point,end_point,duration,way,service_date,contents,details,mem_id
        );

        return res.send(response(baseResponse.SUCCESS));
    }

    // 신청목록) mem_id에 따라 조회하기
    getApplyByMemId = async (req,res)=>{
        const mem_id = req.params.mem_id;

        if(!mem_id){
            return res.send(errResponse(baseResponse.POST_POSTIDX_EMPTY));
        } else if (mem_id <= 0) {
            return res.send(errResponse(baseResponse.POST_POSTIDX_LENGTH));
        }

        const applyListResult = await this.ApplyService.retrieveApplyByMemId(mem_id);

        return res.send(response(baseResponse.SUCCESS, applyListResult));

    }

    // 신청목록) 자세한 신청 내용 보기
    getApplyDetail = async (req,res)=>{
        const apply_id = req.params.apply_id;

        if(!apply_id){
            return res.send(errResponse(baseResponse.POST_POSTIDX_EMPTY));
        } else if (apply_id <= 0) {
            return res.send(errResponse(baseResponse.POST_POSTIDX_LENGTH));
        }

        const Result = await this.ApplyService.retrieveApplyDetail(apply_id);

        return res.send(response(baseResponse.SUCCESS, Result));
    }

    //신청 목록) 매칭 헬퍼 목록 조회하기
    getHelperList = async (req,res)=>{
        const apply_id = req.params.apply_id;

        if(!apply_id){
            return res.send(errResponse(baseResponse.POST_POSTIDX_EMPTY));
        } else if (apply_id <= 0) {
            return res.send(errResponse(baseResponse.POST_POSTIDX_LENGTH));
        }

        const Result = await this.ApplyService.retrieveHelper(apply_id);

        return res.send(response(baseResponse.SUCCESS, Result));
    }

    //신청 목록) 매칭 헬퍼 이력서 조회하기
    getHelperResume = async (req,res)=>{
        const hp_id = req.params.hp_id;

        if(!hp_id){
            return res.send(errResponse(baseResponse.POST_POSTIDX_EMPTY));
        } else if (hp_id <= 0) {
            return res.send(errResponse(baseResponse.POST_POSTIDX_LENGTH));
        }

        const Result = await this.ApplyService.retrieveHelperResume(hp_id);

        return res.send(response(baseResponse.SUCCESS, Result));
    }

    //지원한 헬퍼) 목록 조회하기
    getHelperListByMemId = async (req,res)=>{
        const mem_id = req.params.mem_id;
        if(!mem_id){
            return res.send(errResponse(baseResponse.POST_POSTIDX_EMPTY));
        } else if (mem_id <= 0) {
            return res.send(errResponse(baseResponse.POST_POSTIDX_LENGTH));
        }

        const Result = await this.ApplyService.retrieveListByHelper(mem_id);

        return res.send(response(baseResponse.SUCCESS, Result));
    }

    // 지원한 헬퍼) 수락하기/거절하기
    UpdateAccpet = async (req,res)=>{

        const is_success = req.body.is_success;
        const pg_id = req.body.pg_id;
        if(!pg_id){
            return res.send(errResponse(baseResponse.POST_POSTIDX_EMPTY));
        } else if (pg_id <= 0) {
            return res.send(errResponse(baseResponse.POST_POSTIDX_LENGTH));
        }

        const Result = await this.ApplyService.acceptService(is_success, pg_id);

        return res.send(response(baseResponse.SUCCESS, Result));
    }

    //활동지원 서비스 완료
    finishApply = async (req,res)=>{
        const pg_id = req.body.pg_id;
        const overtime = req.body.overtime;
        if(!pg_id){
            return res.send(errResponse(baseResponse.POST_POSTIDX_EMPTY));
        } else if (pg_id <= 0) {
            return res.send(errResponse(baseResponse.POST_POSTIDX_LENGTH));
        }

        const Result = await this.ApplyService.finishService(pg_id,overtime);

        return res.send(response(baseResponse.SUCCESS, Result));
    }

    //활동지원 서비스 파투
    failApply = async (req,res)=>{
        const pg_id = req.body.pg_id;
        const reason = req.body.reason;
        if(!pg_id){
            return res.send(errResponse(baseResponse.POST_POSTIDX_EMPTY));
        } else if (pg_id <= 0) {
            return res.send(errResponse(baseResponse.POST_POSTIDX_LENGTH));
        }

        const Result = await this.ApplyService.failService(pg_id,reason);

        return res.send(response(baseResponse.SUCCESS, Result));
    }

    //신청목록) 메모 보기
    memoCont = async (req,res)=>{
        const apply_id = req.params.apply_id;
        if(!apply_id){
            return res.send(errResponse(baseResponse.POST_POSTIDX_EMPTY));
        } else if (apply_id <= 0) {
            return res.send(errResponse(baseResponse.POST_POSTIDX_LENGTH));
        }

        const Result = await this.ApplyService.memoService(apply_id);

        return res.send(response(baseResponse.SUCCESS, Result));
    }

    //신청 목록) 메모 수정하기
    memoUpCont = async (req,res)=>{
        const apply_id = req.params.apply_id;
        const memo = req.body.memo;
        if(!apply_id){
            return res.send(errResponse(baseResponse.POST_POSTIDX_EMPTY));
        } else if (apply_id <= 0) {
            return res.send(errResponse(baseResponse.POST_POSTIDX_LENGTH));
        }

        const Result = await this.ApplyService.memoUpdateService(memo,apply_id);

        return res.send(response(baseResponse.SUCCESS, Result));
    }
}

module.exports = ApplyController;