const ApplyService = require('../services/apply.service');

const baseResponse = require('../utilities/baseResponseStatus');
const { errResponse, response } = require('../utilities/response');

class ApplyController {
    ApplyService;

    constructor(){
        this.ApplyService = new ApplyService();
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
        const apply_id = req.body.apply_id;

        if(!apply_id){
            return res.send(errResponse(baseResponse.POST_POSTIDX_EMPTY));
        } else if (apply_id <= 0) {
            return res.send(errResponse(baseResponse.POST_POSTIDX_LENGTH));
        }

        const Result = await this.ApplyService.retrieveApplyDetail(apply_id);

        return res.send(response(baseResponse.SUCCESS, Result));
    }
}

module.exports = ApplyController;