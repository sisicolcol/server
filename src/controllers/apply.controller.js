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
}

module.exports = ApplyController;