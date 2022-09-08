const memberModel = require("../repositorys/member.repository");

const { pool } = require("../config/db");

const baseResponse = require('../utilities/baseResponseStatus')
const { errResponse, response } = require('../utilities/response');

class MemberService {
    memberModel;

    constructor(){
        this.memberModel=new memberModel();
    }

    //회원가입
    signupService = async (memParams) => {
        const connection = await pool.getConnection(async (connection)=>connection);

        try {
            await connection.beginTransaction();

            const Result = await this.memberModel.insertMember(connection,memParams);

            await connection.commit();
            return Result;
        } catch (error) {
            console.log(error);
            await connection.rollback();

            return errResponse(baseResponse.DB_ERROR);
        } finally {
            connection.release();
        }
    }
}

module.exports = MemberService;