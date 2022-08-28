const ApplyModel = require("../repositorys/apply.repository");

const { pool } = require("../config/db");

const baseResponse = require('../utilities/baseResponseStatus')
const { errResponse, response } = require('../utilities/response');

class ApplyService {

    ApplyModel;

    constructor(){
        this.ApplyModel = new ApplyModel();
    }

    // 시각장애인 지원 목록 조회 (apply)
    retrieveApplyList = async () => {
        const connection = await pool.getConnection(async (connection) => connection);
        try {
            await connection.beginTransaction();

            const applySelectResult = await this.ApplyModel.selectApplyList(connection);

            await connection.commit();

            return response(baseResponse.SUCCESS,applySelectResult);
        } catch (error) {
            console.log(error);
            await connection.rollback();

            return errResponse(baseResponse.DB_ERROR);
        } finally {
            connection.release();
        }
    }

    createApply = async (service_time,start_point,end_point,duration,way,service_date,contents,details,mem_id) => {
        const connection = await pool.getConnection(async (connection)=>connection);

        try {
            await connection.beginTransaction();

            const applyParams = [service_time,start_point,end_point,duration,way,service_date,contents,details,mem_id];
            const applyResult = await this.ApplyModel.insertApply(connection,applyParams);

            await connection.commit();
            return
        } catch (error) {
            console.log(error);
            await connection.rollback();

            return errResponse(baseResponse.DB_ERROR);
        } finally {
            connection.release();
        }
    }

    // 신청목록) mem_id에 따라 조회하기
    retrieveApplyByMemId = async (mem_id)=>{
        const connection = await pool.getConnection(async (connection)=>connection);
        try {
            await connection.beginTransaction();

            const applyListResult = await this.ApplyModel.selectApplyByMemID(connection,mem_id);

            await connection.commit();

            return applyListResult;
        } catch (error) {
            console.log(error);
            await connection.rollback();
            return errResponse(baseResponse.DB_ERROR);
        } finally {
            connection.release();
        }
    }

    // 신청목록) 자세한 신청 내용 보기
    retrieveApplyDetail = async (apply_id)=>{
        const connection = await pool.getConnection(async (connection)=> connection);
        try {
           await connection.beginTransaction();
           
           const Result = await this.ApplyModel.selectApplyDetail(connection,apply_id);

           await connection.commit();

           return Result;
        } catch (error) {
            console.log(error);
            await connection.rollback();
            return errResponse(baseResponse.DB_ERROR);
            
        }finally {
            connection.release();
        }
    }
}

module.exports = ApplyService;