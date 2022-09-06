const AlertService = require('../services/alert.service');

const baseResponse = require('../utilities/baseResponseStatus');
const { errResponse, response } = require('../utilities/response');

class AlertController {
    AlertService;

    constructor(){
        this.AlertService = new AlertService();
    }

    // 기기 토큰 받아와서 테이블에 저장하기 
    postToken = async (req,res)=>{
        const {mem_token, mem_id} = req.body;

        if(!mem_id){
            return res.send(errResponse(baseResponse.POST_POSTIDX_EMPTY));
        } 

        const Result = await this.AlertService.saveToken(mem_token, mem_id);

        return res.send(response(baseResponse.SUCCESS, Result));
    }

    // 알림 목록
    getAlertList = async (req,res)=>{
        const mem_id = req.params.mem_id;

        if(!mem_id){
            return res.send(errResponse(baseResponse.POST_POSTIDX_EMPTY));
        } 

        const Result = await this.AlertService.retrieveAlertList(mem_id);

        return res.send(response(baseResponse.SUCCESS, Result));
    }
}

module.exports = AlertController;
