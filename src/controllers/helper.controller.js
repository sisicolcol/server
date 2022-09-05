const HelperService = require('../services/helper.service');

const baseResponse = require('../utilities/baseResponseStatus');
const { errResponse, response } = require('../utilities/response');

class HelperController {
    HelperService;

    constructor(){
        this.HelperService = new HelperService();
    }

    //퀵 활동 지원 서비스) 목록 조회하기
    getQuickList = async (req,res)=>{
        const Result = await this.HelperService.retrieveQuickList();

        return res.send(Result);
    }

    //사전예약 활동 지원 서비스) 목록 조회하기
    getPreList = async (req,res)=>{
        const Result = await this.HelperService.retrievePreList();

        return res.send(Result);
    }
}

module.exports = HelperController;