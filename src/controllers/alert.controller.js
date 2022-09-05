const AlertService = require('../services/alert.service');

const baseResponse = require('../utilities/baseResponseStatus');
const { errResponse, response } = require('../utilities/response');

class AlertController {
    AlertService;

    constructor(){
        this.AlertService = new AlertService();
    }

    // 기기 토큰 받아와서 테이블에 저장하기 
    getToken = async (req,res)=>{
        const mem_token = req.params.mem_token;
        const mem_id = req.params.mem_id;

        if(!mem_id){
            return res.send(errResponse(baseResponse.POST_POSTIDX_EMPTY));
        } else if (mem_id <= 0) {
            return res.send(errResponse(baseResponse.POST_POSTIDX_LENGTH));
        }

        const Result = await this.AlertService.saveToken(mem_token, mem_id);

        return res.send(response(baseResponse.SUCCESS, Result));
    }
}

module.exports = AlertController;
