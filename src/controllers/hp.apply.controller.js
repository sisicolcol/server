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

    }

    // 헬퍼 새로운 자기소개서 작성하기
    postHpApplyNewIdc = async(req,res)=>{

    }
    
    // 헬퍼 지원 완료하기 -> 지원한 신청서의 시간까지 post
    postHpApply = async(req,res)=>{

    }

    // 헬퍼 지원 목록) pg_id 내림차순 (업로드 순)
    getHpApplyList = async(req,res)=>{

    }

    // 헬퍼 지원 목록) 공고 자세히 보기
    getHpApplyDetail = async(req,res)=>{

    }

    // 헬퍼 마이페이지) 프로필 및 자기소개서 설정
    postHpProfile = async(req,res)=>{

    }

}

module.exports = HpApplyController;
