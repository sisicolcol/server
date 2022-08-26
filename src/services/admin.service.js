const AdminModel = require('../models/admin.model');
const CommentModel = require('../models/comment.model');
const PostModel = require('../models/comment.model');
const UserModel = require('../models/user.model');

const { pool } = require('../assets/db');

const baseResponse = require('../utilities/baseResponseStatus')
const { errResponse, response } = require('../utilities/response');

class AdminService {

    AdminModel;
    CommentModel;
    PostModel;
    UserModel;

    constructor() {
        this.AdminModel = new AdminModel();
        this.CommentModel = new CommentModel();
        this.PostModel = new PostModel();
        this.UserModel = new UserModel();
    }

    // 사용자 목록 조회
    retrieveUserList = async (id, name, signUpDate, status, page) => {
        const connection = await pool.getConnection(async (connection) => connection);
        try {
            const offset = (page-1)*10;

            await connection.beginTransaction();
            
            let whereQuery='';
            if (name !== undefined) {
                whereQuery += ` AND name = ${name}`;
            }
            if (id !== undefined) {
                whereQuery += ` AND ID = ${id}`;
            }
            if (status !== undefined) {
                whereQuery += ` AND status = ${status}`;
            }
            if (signUpDate !== undefined) {
                let date = signUpDate.replace(/(\d{4})(\d{2})(\d{2})/,`'$1-$2-$3'`)
                whereQuery += ` AND DATE(createdAt) = DATE(${date})`;
            }
    
            const adminSelectResult = await this.AdminModel.selectUserList(connection, whereQuery, offset);
    
            // 로그 디비 넣기
            for (i=0; i<adminSelectResult.length; i+=1){
                await this.UserModel.insertUserLog(connection, adminSelectResult[i].userIdx, 6);
            }
    
            await connection.commit();
            
            return response(baseResponse.SUCCESS, adminSelectResult);
        } catch (e) {
            console.log(e);
            await connection.rollback();
    
            return errResponse(baseResponse.DB_ERROR);
        } finally {
            connection.release();
        }
    }

    // 사용자 상세 정보 조회
    retrieveUserDetailList = async (userIdx) => {
        const connection = await pool.getConnection(async (connection) => connection);
        try {
            await connection.beginTransaction();

            const userLastLoginTime = await this.AdminModel.selectUserLastLoginTime(connection, userIdx);
            const userPosts = await this.AdminModel.selectUserPostByUserIdx(connection, userIdx);
            const userPostImg = await this.AdminModel.selectUserProfileImgByUserIdx(connection, userIdx);
            const userPostLikes = await this.AdminModel.selectUserPostLikeByUserIdx(connection, userIdx);
            const userPostReports = await this.AdminModel.selectUserPostReportByUserIdx(connection, userIdx);
            const userComments = await this.AdminModel.selectUserCommentByUserIdx(connection, userIdx);
            const userCommentLikes = await this.AdminModel.selectUserCommentLikeByUserIdx(connection, userIdx);
            const userCommentRepoerts = await this.AdminModel.selectUserCommentReportByUserIdx(connection, userIdx);
            const userFollowingMembers = await this.AdminModel.selectUserFollowingByUserIdx(connection, userIdx);
            const userFollowerMembers = await this.AdminModel.selectUserFollowerByUserIdx(connection, userIdx);
            const userMessages = await this.AdminModel.selectUserMessageByUserIdx(connection, userIdx);
    
            await this.UserModel.insertUserLog(connection, userIdx, 6);
    
            await connection.commit();
            
            return response(baseResponse.SUCCESS, 
                [ {'마지막 로그인 시간': userLastLoginTime[0]} ,
                { '작성 게시글': userPosts },
                { '작성 게시글 사진': userPostImg },
                { '좋아요 누른 게시글': userPostLikes },
                { '신고한 게시글': userPostReports },
                { '작성 댓글': userComments },
                { '좋아요 누른 댓글': userCommentLikes },
                { '신고한 댓글': userCommentRepoerts },
                { '이 사용자가 팔로잉하는 사용자': userFollowingMembers },
                { '이 사용자를 팔로잉하는 사용자': userFollowerMembers },
                { '보낸 메시지': userMessages }]
            );
    
        } catch (e) {
            console.log(e);
            await connection.rollback();
    
            return errResponse(baseResponse.DB_ERROR);
        } finally {
            connection.release();
        }
    }


    // 관리자 권한으로 사용자 정지
    sudoBanUser = async (userIdx) => {
        const connection = await pool.getConnection(async (connection) => connection);
        try {
            const adminSelectResult = await this.AdminModel.updateUserStatus(connection, userIdx);
            await this.UserModel.insertUserLog(connection, userIdx, 5);
            
            await connection.commit();

            return response(baseResponse.SUCCESS, adminSelectResult);
        } catch (e) {
            console.log(e);
            await connection.rollback();

            return errResponse(baseResponse.DB_ERROR);
        } finally {
            connection.release();
        }
    }

    // 게시글 목록 조회
    retrievePostList = async (id, postDate, status, page) => {
        const connection = await pool.getConnection(async (connection) => connection);
        try {
            await connection.beginTransaction();
            const offset = (page-1)*10;
            
            let whereQuery='';
            if (id !== undefined) {
                whereQuery += ` AND ID = ${id}`;
            }
            if (status !== undefined) {
                whereQuery = ` AND status = ${status}`
            }
            if (postDate !== undefined) {
                let date = postDate.replace(/(\d{4})(\d{2})(\d{2})/,`'$1-$2-$3'`)
                whereQuery += ` AND DATE(createdAt) = DATE(${date})`
            }

            const adminSelectResult = await this.AdminModel.selectPostList(connection, whereQuery, offset);

            // 로그 집어넣기
            for (i =0; i<adminSelectResult.length; i+=1){
                await this.PostModel.insertPostLog(connection, adminSelectResult[i].postIdx, 5);
            }

            await connection.commit();
            
            return response(baseResponse.SUCCESS, adminSelectResult);
        } catch (e) {
            console.log(e);
            await connection.rollback();

            return errResponse(baseResponse.DB_ERROR);
        } finally {
            connection.release();
        }
    }

    // 게시글 세부 내용 조회
    exportsretrievePostDetailList = async (postIdx) => {
        const connection = await pool.getConnection(async (connection) => connection);
        try {
            await connection.beginTransaction();

            const postResult = await this.AdminModel.selectPostByPostIdx(connection, postIdx);
            const postImgResult = await this.AdminModel.selectPostImgByPostIdx(connection, postIdx);
            const postLikeResult = await this.AdminModel.selectPostLikeByPostIdx(connection, postIdx);
            const postReportResult = await this.AdminModel.selectPostReportByPostIdx(connection, postIdx);
            const postCommentResult = await this.AdminModel.selectPostCommentByPostIdx(connection, postIdx);

            await this.PostModel.insertPostLog(connection, postIdx, 5);

            await connection.commit();
            return response(baseResponse.SUCCESS, 
                [ {'게시글 정보': postResult } ,
                { '게시글 사진': postImgResult },
                { '게시글 좋아요 수': postLikeResult[0] },
                { '게시글 신고 목록': postReportResult },
                { '게시글 댓글 목록': postCommentResult }]);
        } catch (e) {
            console.log(e);
            await connection.rollback();

            return errResponse(baseResponse.DB_ERROR);
        } finally {
            connection.release();
        }
    }

    // 게시글, 댓글 강제 삭제
    sudoUpdatePostAndReleatedCommentStatus = async (postIdx) => {
        const connection = await pool.getConnection(async (connection) => connection);
        try {
            await connection.beginTransaction();

            const postStatusResult = await this.AdminModel.updatePostStatus(connection, postIdx);
            const commentsOfPostResult = await this.AdminModel.selectCommentIdxByPostIdx(connection, postIdx);
            const commentStatusResult = await this.AdminModel.updateCommentStatusByPostIdx(connection, postIdx);

            await this.PostModel.insertPostLog(connection, postIdx, 4);
            for (i = 0; i<commentsOfPostResult.length; i+=1){
                await this.CommentModel.insertCommetLog(connection, commentsOfPostResult[i].commentIdx, 4);
            }
            await connection.commit();

            return response(baseResponse.SUCCESS);
        } catch (e) {
            console.log(e);
            await connection.rollback();
            
            return errResponse(baseResponse.DB_ERROR);
        } finally {
            connection.release();
        }
    }

    // 게시글 강제 삭제
    sudoUpdateCommentStatus = async (postIdx) => {
        const connection = await pool.getConnection(async (connection) => connection);
        try {
            await connection.beginTransaction();
            
            await this.AdminModel.updatePostStatus(connection, postIdx);

            await this.PostModel.insertPostLog(connection, postIdx, 4);

            await connection.commit();

            return response(baseResponse.SUCCESS);
        } catch (e) {
            console.log(e);
            await connection.rollback();
            
            return errResponse(baseResponse.DB_ERROR);
        } finally {
            connection.release();
        }
    }

    // 댓글 강제 삭제
    sudoUpdateCommentStatus = async (commentIdx) => {
        const connection = await pool.getConnection(async (connection) => connection);
        try {
            await connection.beginTransaction();

            await this.AdminModel.updateCommentStatusByCommentIdx(connection, commentIdx);
            await this.CommentModel.insertCommetLog(connection, commentIdx, 4);

            await connection.commit();

            return response(baseResponse.SUCCESS);
        } catch (e) {
            console.log(e);
            await connection.rollback();
            
            return errResponse(baseResponse.DB_ERROR);
        } finally {
            connection.release();
        }
    }

    // 모든 신고 내역 조회
    retrieveReportList = async () => {
        const connection = await pool.getConnection(async (connection) => connection);
        try {
            await connection.beginTransaction();
            const postReportResult = await this.AdminModel.selectPostReports(connection);
            const commentReportResult = await this.AdminModel.selectCommentReports(connection);

            for (i = 0; i<postReportResult.length; i+=1){
                await this.PostModel.insertReportLog(connection, 7, postReportResult[i].postReportIdx,1, 5);
            }
        
            for (i = 0; i<commentReportResult.length; i+=1){
                await this.CommentModel.insertReportLog(connection, commentReportResult[i].connectionReportIdx, 1,  0, 5);  
            }

            await conneciton.commit();
            return response(baseResponse.SUCCESS,
            { "댓글 신고 목록" : postReportResult, 
            "게시글 신고 목록" : commentReportResult},
            );
        } catch (e) {
            console.log(e);
            await connection.rollback();
            
            return errResponse(baseResponse.DB_ERROR);
        } finally {
            connection.release();
        }
    }

    // 신고 게시글 내용 조회
    retrieveReportPostContent = async (postIdx) => {
        const connection = await pool.getConnection(async (connection) => connection);
        try {
            await connection.beginTransaction();
            const postReportResult = await this.AdminModel.selectReportPostContent(connection, postIdx);

            await this.PostModel.insertPostLog(connection, postIdx, 4);
            
            await connection.commit();

            return response(baseResponse.SUCCESS, postReportResult);
        } catch (e) {
            console.log(e);
            await connection.rollback();
            
            return errResponse(baseResponse.DB_ERROR);
        } finally {
            connection.release();
        }
    }

    // 신고 댓글 내용 조회
    retrieveReportCommentContent = async (commentIdx) => {
        const connection = await pool.getConnection(async (connection) => connection);
        try {
            await connection.beginTransaction();

            const commentReportResult = await this.AdminModel.selectReportCommentContent(connection, commentIdx);

            await this.CommentModel.insertCommetLog(connection, commentIdx, 4);

            await connection.commit();

            return response(baseResponse.SUCCESS, commentReportResult);
        } catch (e) {
            console.log(e);
            await connection.rollback();
            
            return errResponse(baseResponse.DB_ERROR);
        } finally {
            connection.release();
        }
    }

    // 게시글 신고 사유 조회
    retrieveReportPostReportCode = async (postIdx) => {
        const connection = await pool.getConnection(async (connection) => connection);
        try {
            await connection.beginTransaction();
            const postReportResult = await this.AdminModel.selectReportPostReportCode(connection, postIdx);

            await this.PostModel.insertReportLog(connection,7, postReportResult[0].postReportIdx, 1, 5);

            await connection.commit();

            return response(baseResponse.SUCCESS, postReportResult);
        } catch (e) {
            console.log(e);
            await connection.rollback();
            
            return errResponse(baseResponse.DB_ERROR);
        } finally {
            connection.release();
        }
    }

    // 댓글 신고 사유 조회
    retrieveReportCommentReportCode = async (commentIdx) => {
        const connection = await pool.getConnection(async (connection) => connection);
        try {
            await connection.beginTransaction();
            const commentReportResult = await this.AdminModel.selectReportCommentReportCode(connection, commentIdx);

            await this.CommentModel.insertReportLog(connection, commentReportResult[0].commentReportIdx, 1, 0, 5);

            await connection.commit();

            return response(baseResponse.SUCCESS, commentReportResult);
        } catch (e) {
            console.log(e);
            await connection.rollback();

            return errResponse(baseResponse.DB_ERROR);
        } finally {
            connection.release();
        }
    }

    // 게시글 신고 강제 삭제
    sudoUpdatePostReportStatus = async (postReportIdx) => {
        const connection = await pool.getConnection(async (connection) => connection);
        try {
            await connection.beginTransaction();
            const postReportResult = await this.AdminModel.updatePostReportStatus(connection, postReportIdx);

            await this.PostModel.insertReportLog(connection, 7, postReportIdx, 0, 4);

            await connection.commit();
            return response(baseResponse.SUCCESS, postReportResult);
        } catch (e) {
            console.log(e);
            await connection.rollback();
            
            return errResponse(baseResponse.DB_ERROR);
        } finally {
            connection.release();
        }
    }

    // 댓글 신고 강제 삭제
    sudoUpdateCommentReportStatus = async (commentReportIdx) => {
        const connection = await pool.getConnection(async (connection) => connection);
        try {
            await connection.beginTransaction();
            const commentReportResult = await this.AdminModel.updateCommentReportStatus(connection, commentReportIdx);

            await this.CommentModel.insertReportLog(connection, commentReportIdx, 1,  1, 4);

            await connection.commit();

            return response(baseResponse.SUCCESS, commentReportResult);
        } catch (e) {
            console.log(e);
            await connection.rollback();

            return errResponse(baseResponse.DB_ERROR);
        } finally {
            connection.release();
        }
    }

    // 사용자 관련 로그 조회
    retrieveUserLogs = async (page) => {
        const connection = await pool.getConnection(async(connection)=> connection);
        try {
            await connection.beginTransaction();

            const offset = (page-1)*10;
            const logResults = await this.AdminModel.selectUserLogs(connection, offset);

            await connection.commit();
            
            return response(baseResponse.SUCCESS, logResults);
        } catch (e){
            console.log(e)
            await conneciton.rollback();

            return errResponse(baseResponse.DB_ERROR)
        } finally {
            connection.release();
        }
    }

    // 게시글 관련 로그 조회
    retrievePostLogs = async (page) => {
        const connection = await pool.getConnection(async(connection)=> connection);
        try {
            await connection.beginTransaction();

            const offset = (page-1)*10;
            const logResults = await this.AdminModel.selectPostLogs(connection, offset);

            await connection.commit();

            return response(baseResponse.SUCCESS, logResults);
        } catch (e){
            console.log(e);
            await connection.rollback;

            return errResponse(baseResponse.DB_ERROR);
        } finally {
            connection.release();
        }
    }

    // 댓글 관련 로그 조회
    retrieveCommentLogs = async (page) => {
        const connection = await pool.getConnection(async(connection)=> connection);
        try {
            await connection.beginTransaction();

            const offset = (page-1)*10;
            const logResults = await this.AdminModel.selectCommentLogs(connection, offset);

            await connection.commit();

            return response(baseResponse.SUCCESS, logResults);
        } catch (e){
            console.log(e);
            await connection.rollback();

            return errResponse(baseResponse.DB_ERROR);
        } finally {
            connection.release();
        }
    }

    // 신고 관련 로그 조회
    retrieveReportLogs = async (page) => {
        const connection = await pool.getConnection(async(connection)=> connection);
        try {
            await connection.beginTransaction();

            const offset = (page-1)*10;
            const logResults = await this.AdminModel.selectReportLogs(connection, offset);

            await connection.commit();

            return response(baseResponse.SUCCESS, logResults);
        } catch (e){
            console.log(e);
            await connection.rollback();

            return errResponse(baseResponse.DB_ERROR)
        } finally {
            connection.release();
        }
    }
    
}

module.exports = AdminService;