const HpApplyModel = require("../repositorys/hp.apply.repository");

const { pool } = require("../config/db");

const baseResponse = require('../utilities/baseResponseStatus')
const { errResponse, response } = require('../utilities/response');

class HpApplyService {

    HpApplyModel;

    constructor(){
        this.HpApplyModel = new HpApplyModel();
    }

    
    // 헬퍼 퀵/사전 활동 지원 서비스) 지원하기 -기존 자기소개서 보기
    retrieveHpApply = async (hp_id) => {
        const connection = await pool.getConnection(async (connection)=>connection);
        try {
            await connection.beginTransaction();

        } catch (error) {
            console.log(error);
            await connection.rollback();
            return errResponse(baseResponse.DB_ERROR);
        } finally {
            connection.release();
        }
    }
    
    // 헬퍼 지원 완료하기 -> 지원한 신청서의 시간까지 post해서 알림 목록으로
    completeHpApply = async (apply_id, mem_id, hp_id, hp_dic_id, is_new, new_idc, is_success, memo, apply_date, start_point, end_point) => {
        const connection = await pool.getConnection(async (connection)=>connection);
        try {
            await connection.beginTransaction();
            
        } catch (error) {
            console.log(error);
            await connection.rollback();
            return errResponse(baseResponse.DB_ERROR);
        } finally {
            connection.release();
        }
    }

    // 헬퍼 지원 목록) pg_id 내림차순 (업로드 순)
    retrieveHpApplyList = async (hp_id) => {
        const connection = await pool.getConnection(async (connection)=>connection);
        try {
            await connection.beginTransaction();
            
        } catch (error) {
            console.log(error);
            await connection.rollback();
            return errResponse(baseResponse.DB_ERROR);
        } finally {
            connection.release();
        }
    }

    // 헬퍼 지원 목록) 공고 자세히 보기
    retrieveHpApplyDetail = async (apply_id) => {
        const connection = await pool.getConnection(async (connection)=>connection);
        try {
            await connection.beginTransaction();
            
        } catch (error) {
            console.log(error);
            await connection.rollback();
            return errResponse(baseResponse.DB_ERROR);
        } finally {
            connection.release();
        }
    }

    // 헬퍼 마이페이지) 프로필 및 자기소개서 설정
    settingHpProfile = async (hp_id, hp_name, hp_idc_id, content) => {
        const connection = await pool.getConnection(async (connection)=>connection);
        try {
            await connection.beginTransaction();
            
        } catch (error) {
            console.log(error);
            await connection.rollback();
            return errResponse(baseResponse.DB_ERROR);
        } finally {
            connection.release();
        }
    }

}

module.exports = HpApplyService;