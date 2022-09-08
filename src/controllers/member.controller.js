const MemberService = require('../services/member.service');

const baseResponse = require('../utilities/baseResponseStatus');
const { errResponse, response } = require('../utilities/response');

class memberController {
    MemberService;

    constructor(){
        this.MemberService = new MemberService();
    }

    //회원가입
    signupCont = async(req,res)=>{
        if (Object.keys(req.body).length === 7){
            let {mem_id, password, mem_name, mem_phone, mem_gender, mem_card, mem_address} = req.body;
            let params = [mem_id, password, mem_name, mem_phone, mem_gender, mem_card, mem_address];
            const result = await this.MemberService.signupService(params);
            return res.send(response(baseResponse.SUCCESS, result));
        }else {
            let {mem_id, password, mem_name, mem_phone, mem_gender, mem_cert} = req.body;
            let params = [mem_id, password, mem_name, mem_phone, mem_gender, mem_cert];
            const result = await this.MemberService.signupService(params);
            return res.send(response(baseResponse.SUCCESS, result));
        }
    }
}

module.exports = memberController;