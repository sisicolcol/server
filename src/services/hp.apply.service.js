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

            const Result = await this.HpApplyModel.selectHpIdc(connection, hp_id);

            await connection.commit();

            return response(baseResponse.SUCCESS,Result);
        } catch (error) {
            console.log(error);
            await connection.rollback();
            return errResponse(baseResponse.DB_ERROR);
        } finally {
            connection.release();
        }
    }
    
    // 헬퍼 지원 완료하기 -> 알림 목록으로
    completeHpApply = async (apply_id, mem_id, hp_id, is_new, new_idc, apply_date, start_point, end_point) => {
        const connection = await pool.getConnection(async (connection)=>connection);
        try {
            await connection.beginTransaction();

            const Params = [apply_id, mem_id, hp_id, is_new, new_idc, apply_date, start_point, end_point];
            const Result = await this.HpApplyModel.insertHpApply(connection, Params);

            await connection.commit();

            return response(baseResponse.SUCCESS,Result);
        } catch (error) {
            console.log(error);
            await connection.rollback();
            return errResponse(baseResponse.DB_ERROR);
        } finally {
            connection.release();
        }
    }

    retrieveHpPreIdc = async(hp_id) => {
        const connection = await pool.getConnection(async (connection)=>connection);
        try {
            await connection.beginTransaction();

            const Result = await this.HpApplyModel.selectHpPreIdc(connection, hp_id);

            await connection.commit();

            console.log("Result Service : ", Result);

            return response(baseResponse.SUCCESS,Result);
        } catch (error) {
            console.log(error);
            await connection.rollback();
            return errResponse(baseResponse.DB_ERROR);
        } finally {
            connection.release();
        }
    }

    firstHpPreIdc = async(content, hp_id) => {
        const connection = await pool.getConnection(async (connection)=>connection);
        try {
            await connection.beginTransaction();
            
            const Result = await this.HpApplyModel.insertHpPreIdc(connection, content, hp_id);

            await connection.commit();

            return response(baseResponse.SUCCESS,Result);
        } catch (error) {
            console.log(error);
            await connection.rollback();
            return errResponse(baseResponse.DB_ERROR);
        } finally {
            connection.release();
        }
    }

    modifyHpPreIdc = async(content, hp_id) => {
        const connection = await pool.getConnection(async (connection)=>connection);
        try {
            await connection.beginTransaction();
            
            const Result = await this.HpApplyModel.updateHpPreIdc(connection, content, hp_id);

            await connection.commit();

            return response(baseResponse.SUCCESS,Result);
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