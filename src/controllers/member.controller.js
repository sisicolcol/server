const MemberService = require('../services/member.service');
const dotenv = require('dotenv');
const baseResponse = require('../utilities/baseResponseStatus');
const { errResponse, response } = require('../utilities/response');

const jwt = require('jsonwebtoken');

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

    //로그인
    loginCont = async(req,res)=>{
        let {mem_id,password} = req.body;
        const result = await this.MemberService.checkIdService(mem_id,password);
        if(result.length !=0){
            const token = jwt.sign({
                type: 'JWT'
            },process.env.JWT_SECRET,{
                expiresIn:"30d"
            });
            return res.send(response(baseResponse.SUCCESS,token));
        }else{
            return res.send(response(baseResponse.SIGNIN_ERROR));
        }
    }
}

module.exports = memberController;