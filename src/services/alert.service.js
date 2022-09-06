const AlertModel = require("../repositorys/alert.repository.js");

const { pool } = require("../config/db");

const baseResponse = require('../utilities/baseResponseStatus')
const { errResponse, response } = require('../utilities/response');

class AlertService {

    AlertModel;

    constructor(){
        this.AlertModel = new AlertModel();
    }
    
    saveToken = async (mem_token, mem_id) => {
        const connection = await pool.getConnection(async (connection)=>connection);
        try {
            await connection.beginTransaction();

            const Result = await this.AlertModel.updateToken(connection, mem_token, mem_id);

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

    // 알림 목록
    retrieveAlertList = async (mem_id) => {
        const connection = await pool.getConnection(async (connection)=>connection);
        try {
            await connection.beginTransaction();

            const Result = await this.AlertModel.selectAlertList(connection, mem_id);

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

module.exports = AlertService;