const HpApplyService = require('../services/hp.apply.service');

const baseResponse = require('../utilities/baseResponseStatus');
const { errResponse, response } = require('../utilities/response');

class HpApplyController {
    HpApplyService;

    constructor(){
        this.HpApplyService = new HpApplyService();
    }

    // 헬퍼 퀵/사전 활동 지원 서비스) 지원하기 -기존 자기소개서 보기
    getHpApply = async (req,res)=>{
        const hp_id = req.params.hp_id;

        if(!hp_id){
            return res.send(errResponse(baseResponse.POST_POSTIDX_EMPTY));
        } else if (hp_id <= 0) {
            return res.send(errResponse(baseResponse.POST_POSTIDX_LENGTH));
        }

        const Result = await this.HpApplyService.retrieveHpApply(hp_id);

        return res.send(response(baseResponse.SUCCESS, Result));
    }

    postHpApplyNewIdc = async(req,res)=>{
        const {apply_id, mem_id, hp_id, hp_idc_id, is_new, new_idc, is_success, memo, apply_date, start_point, end_point} = req.body;

        const Result = await this.HpApplyService.completeHpApply(
            apply_id, mem_id, hp_id, hp_idc_id, is_new, new_idc, is_success, memo, apply_date, start_point, end_point
        );

        return res.send(response(baseResponse.SUCCESS));
    }
    
    // 헬퍼 지원 완료하기 -> 지원한 신청서의 시간까지 post해서 알림 목록으로
    postHpApply = async(req,res)=>{
        
    }

    // 헬퍼 지원 목록) pg_id 내림차순 (업로드 순)
    getHpApplyList = async(req,res)=>{
        const hp_id = req.params.hp_id;

        if(!hp_id){
            return res.send(errResponse(baseResponse.POST_POSTIDX_EMPTY));
        } else if (hp_id <= 0) {
            return res.send(errResponse(baseResponse.POST_POSTIDX_LENGTH));
        }

        const Result = await this.HpApplyService.retrieveHpApplyList(hp_id);

        return res.send(response(baseResponse.SUCCESS, Result));
    }

    // 헬퍼 지원 목록) 공고 자세히 보기
    getHpApplyDetail = async(req,res)=>{
        const apply_id = req.params.apply_id;

        if(!apply_id){
            return res.send(errResponse(baseResponse.POST_POSTIDX_EMPTY));
        } else if (apply_id <= 0) {
            return res.send(errResponse(baseResponse.POST_POSTIDX_LENGTH));
        }

        const Result = await this.HpApplyService.retrieveHpApplyDetail(apply_id);

        return res.send(response(baseResponse.SUCCESS, Result));

    }

    // 헬퍼 마이페이지) 프로필 및 자기소개서 설정
    postHpProfile = async(req,res)=>{
        const {hp_id, hp_name, hp_idc_id, content} = req.body;

        const Result = await this.HpApplyService.settingHpProfile(
            hp_id, hp_name, hp_idc_id, content
        );

        return res.send(response(baseResponse.SUCCESS));
    }

}

module.exports = HpApplyController;
