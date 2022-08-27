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
}

module.exports = ApplyService;