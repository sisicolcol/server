const ApplyModel = require("../repositorys/apply.repository");
const RoomRepository = require("../repositorys/room.repository");
const HpApplyModel = require("../repositorys/hp.apply.repository");
const MemberModel = require("../repositorys/member.repository");
const ProgressListRepository = require('../repositorys/progressList.repository');
const MessageRepository = require('../repositorys/message.repository');
const ChatroomRepository = require('../repositorys/room.repository');
const { pool } = require("../config/db");

const baseResponse = require('../utilities/baseResponseStatus')
const { errResponse, response } = require('../utilities/response');

class ApplyService {

    ApplyModel;
    ProgressListRepository;

    constructor(){
        this.ApplyModel = new ApplyModel();
        this.RoomRepository = new RoomRepository();
        this.HpApplyModel = new HpApplyModel();
        this.MemberModel = new MemberModel();
        this.ProgressListRepository = new ProgressListRepository();
        this.MessageRepository = new MessageRepository();
        this.ChatroomRepository = new ChatroomRepository();
    }

    //Test용
    makeTableS = async () => {
        const connection = await pool.getConnection(async (connection) => connection);
        try {
            await connection.beginTransaction();

            const applySelectResult = await this.ApplyModel.makeTable(connection);

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
            return applyResult;
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

    // 신청 목록) 매칭 헬퍼 목록 조회하기
    retrieveHelper = async (apply_id) => {
        const connection = await pool.getConnection(async (connection)=> connection);
        try {
           await connection.beginTransaction();
           
           const Result = await this.ApplyModel.selectHelperList(connection,apply_id);

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

    //신청 목록) 매칭 헬퍼 이력서 조회하기
    retrieveHelperResume = async (hp_id) => {
        const connection = await pool.getConnection(async (connection)=> connection);
        try {
           await connection.beginTransaction();
           
           const Result = await this.ApplyModel.selectHelperResume(connection,hp_id);

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

    //지원한 헬퍼) 목록 조회하기
    retrieveListByHelper = async (mem_id) => {
        const connection = await pool.getConnection(async (connection)=> connection);
        try {
           await connection.beginTransaction();
           
           const Result = await this.ApplyModel.selectListByHelper(connection,mem_id);

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

    // 지원한 헬퍼) 수락하기/거절하기
    acceptService = async (is_success, pg_id) => {
        const connection = await pool.getConnection(async (connection)=> connection);
        try {
           await connection.beginTransaction();
        
           const result = await this.ApplyModel.updateHelper(connection, is_success, pg_id);


           // 이준희 추가
           const progressListInfo = await this.ProgressListRepository.selectMemberNamesByPgId(connection, pg_id);

           // 사용자들 식별자 추가
           const member_no = await this.MemberModel.selectMemberIdxById(connection, progressListInfo[0].mem_id);
           const blind_user_no = await this.MemberModel.selectMemberIdxById(connection, progressListInfo[0].hp_id);           

           // 샤용자가 수락한 경우에만 채팅방 생성
           if (is_success == 1) {
                await this.RoomRepository.insertNewRoom(connection, progressListInfo[0].apply_id, member_no[0].mem_no , blind_user_no[0].mem_no);

                const insertResult = await this.ChatroomRepository
                                                .insertNewRoom(connection, progressListInfo[0].apply_id, member_no[0].mem_no, blind_user_no[0].mem_no);

                await this.MessageRepository.insertUserChat(connection, insertResult.insertId, member_no[0].mem_no , blind_user_no[0].mem_no, '채팅이 시작되었습니다' );
           }

           await connection.commit();

            return (baseResponse.SUCCESS);
        } catch (error) {
            console.log(error);
            await connection.rollback();

            return errResponse(baseResponse.DB_ERROR);

        }finally {
            connection.release();
        } 
    }

    //활동지원 서비스 완료
    finishService = async ( pg_id, overtime ) => {

        const connection = await pool.getConnection(async (connection)=> connection);
        try {
           await connection.beginTransaction();
           
           const Result = await this.ApplyModel.InsertFinishApply(connection, pg_id, overtime);

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

    //활동지원 서비스 파투
    failService = async (pg_id,reason) => {
        const connection = await pool.getConnection(async (connection)=> connection);
        try {
           await connection.beginTransaction();
           
           const Result = await this.ApplyModel.insertFail(connection,pg_id,reason);

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

    //신청목록) 메모 보기
    memoService = async (apply_id) => {
        const connection = await pool.getConnection(async (connection)=> connection);
        try {
           await connection.beginTransaction();
           
           const Result = await this.ApplyModel.selectMemo(connection,apply_id);

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

    //신청 목록) 메모 수정하기
    memoUpdateService = async (memo,apply_id) => {
        const connection = await pool.getConnection(async (connection)=> connection);
        try {
           await connection.beginTransaction();
           
           const Result = await this.ApplyModel.updateMemo(connection,memo,apply_id);

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