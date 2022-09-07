const HpApplyService = require('../services/hp.apply.service');

const baseResponse = require('../utilities/baseResponseStatus');
const { errResponse, response } = require('../utilities/response');

const { Expo } = require('expo-server-sdk')

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

    // 헬퍼 지원 완료하기 -> 알림 목록으로
    postHpApply = async(req,res)=>{
        const {apply_id, mem_id, hp_id, is_new, new_idc, apply_date, start_point, end_point} = req.body;

        const Result = await this.HpApplyService.completeHpApply(
            apply_id, mem_id, hp_id, is_new, new_idc, apply_date, start_point, end_point
        );
        
        // mem_id의 token가져오기
        const tokenResult = await this.HpApplyService.retrieveMemToken(
            mem_id
        );

        // 해당 서비스의 시간, 날짜 가져오기
        const serviceResult = await this.HpApplyService.retrieveHpService(
            apply_id
        );

        let service_time = serviceResult.result[0].service_time.slice(0,5).replace(":", "시 ");;
        let service_date = serviceResult.result[0].service_date.toISOString().slice(5,10).replace("-", "월 ");

        // 헬퍼에게 알림
        let expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });
        let pushToken = tokenResult.result[0].mem_token;
        let messages = [];
        messages.push({
            to: pushToken,
            sound: 'default',
            body: `${service_date}일 ${service_time}분에 신청한 서비스에 활동지원사의 지원이 들어왔습니다.`,
            data: { withSome: 'data' },
        });

        if (!Expo.isExpoPushToken(pushToken)) {
            console.error(`Push token ${pushToken} is not a valid Expo push token`);
        }

        let chunks = expo.chunkPushNotifications(messages);
        let tickets = [];
        (async () => {
        for (let chunk of chunks) {
            try {
            let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
            tickets.push(...ticketChunk);
            } catch (error) {
            console.error(error);
            }
        }
        })();

        let message = messages[0].body;
        console.log("service alert message : ", message);

        // 알림 목록 저장
        const messageResult = await this.HpApplyService.saveMessageService(
            mem_id, message
        );

        return res.send(response(baseResponse.SUCCESS, Result));
    }

    // 헬퍼 마이페이지) 자기소개서 가져오기
    getHpPreIdc = async(req,res)=>{
        const hp_id = req.params.hp_id;

        if(!hp_id){
            return res.send(errResponse(baseResponse.POST_POSTIDX_EMPTY));
        } else if (hp_id <= 0) {
            return res.send(errResponse(baseResponse.POST_POSTIDX_LENGTH));
        }

        const Result = await this.HpApplyService.retrieveHpPreIdc(hp_id);

        return res.send(response(baseResponse.SUCCESS, Result));
    }
    
    // 헬퍼 마이페이지) 자기소개서 insert or update
    postHpPreIdc = async(req,res)=>{
        const {is_exist, content, hp_id} = req.body;

        if(!hp_id){
            return res.send(errResponse(baseResponse.POST_POSTIDX_EMPTY));
        } else if (hp_id <= 0) {
            return res.send(errResponse(baseResponse.POST_POSTIDX_LENGTH));
        }

        if (is_exist == 0) {
            const insertResult = await this.HpApplyService.firstHpPreIdc(
                content, hp_id
            );
            return res.send(response(baseResponse.SUCCESS, insertResult));
        }
        else if (is_exist == 1){
            const updateResult = await this.HpApplyService.modifyHpPreIdc(
                content, hp_id
            );
            return res.send(response(baseResponse.SUCCESS, updateResult));
        }      
    }

}

module.exports = HpApplyController;
