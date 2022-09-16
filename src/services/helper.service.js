const HelperRepository = require('../repositorys/helper.repository');

const { pool } = require("../config/db");

const baseResponse = require('../utilities/baseResponseStatus')
const { errResponse, response } = require('../utilities/response');

class HelperService {

    HelperRepository;

    constructor(){
        this.HelperRepository=new HelperRepository();
    }

    //퀵 활동 지원 서비스) 목록 조회하기
    retrieveQuickList = async () => {
        const connection = await pool.getConnection(async (connection) => connection);
        try {
            await connection.beginTransaction();

            const applySelectResult = await this.HelperRepository.selectQuick(connection);

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

    //사전예약 활동 지원 서비스) 목록 조회하기
    retrievePreList = async () => {
        const connection = await pool.getConnection(async (connection) => connection);
        try {
            await connection.beginTransaction();

            const applySelectResult = await this.HelperRepository.selectPre(connection);

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

    //나의 지원 목록) 조회하기
    retrieveMyApply = async (hp_id) => {
        const connection = await pool.getConnection(async (connection) => connection);
        try {
            await connection.beginTransaction();

            const applySelectResult = await this.HelperRepository.selectMyApply(connection,hp_id);

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

    //나의 지원 목록) 메모 보기
    memoService = async (hp_id,apply_id) => {
        const connection = await pool.getConnection(async (connection)=> connection);
        try {
            await connection.beginTransaction();
            
            const Result = await this.HelperRepository.selectMemo(connection,hp_id,apply_id);

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
    
    //나의 지원 목록) 메모 수정하기
    memoUpdateService = async (memo,hp_id,apply_id) => {
        const connection = await pool.getConnection(async (connection)=> connection);
        try {
            await connection.beginTransaction();
            
            const Result = await this.HelperRepository.updateMemo(connection,memo,hp_id,apply_id);

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

module.exports = HelperService;