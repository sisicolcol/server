class HpApplyModel {
    
    // 헬퍼 퀵/사전 활동 지원 서비스) 지원하기 -기존 자기소개서 보기
    selectHpIdc = async (conn, hp_id) => {
        const selectHpIdcQuery = `
            SELECT content, date
            FROM hp_idc
            WHERE hp_id = ?
        `;
        const [Row] = await conn.query(selectHpIdcQuery, hp_id);

        return Row;
    }

    // 헬퍼 지원 완료하기 -> 알림 목록으로
    insertHpApply = async (conn, Params) => {
        const insertHpApplyQuery =   `
            INSERT INTO progress_list(apply_id, mem_id, hp_id, is_new, new_idc, apply_date, start_point, end_point)
            values(?,?,?,?,?,?,?,?)
        `
        const [Row] = await conn.query(insertHpApplyQuery,Params);

        return Row;
    }

    // mem_id의 token가져오기
    selectMemToken = async (conn, mem_id) => {
        const selectMemTokenQuery = `
            SELECT mem_token
            FROM member
            WHERE mem_id = ?
        `;
        const [Row] = await conn.query(selectMemTokenQuery, mem_id);

        return Row;
    }
    
    // 해당 서비스의 시간, 날짜 가져오기
    selectMemService = async (conn, apply_id) => {
        const selectMemTokenQuery = `
            SELECT service_time, service_date
            FROM apply
            WHERE apply_id = ?
        `;
        const [Row] = await conn.query(selectMemTokenQuery, apply_id);

        return Row;
    }

    // 알림 목록 저장
    insertAlertMsg = async (conn, mem_id, message) => {
        const insertAlertMsgQuery = `
            INSERT INTO service_alert(mem_id, message)
            values(?,?)
        `
        const list = [mem_id, message];
        const [Row] = await conn.query(insertAlertMsgQuery, list);

        return Row;
    
    }

    // 헬퍼 마이페이지) hp_idc에 이미 기본 자기소개서가 있는지 확인
    selectHpPreIdc = async (conn, hp_id) => {
        const selectHpIdcQuery =  `
            SELECT content
            FROM hp_idc
            WHERE hp_id = ?
        `;
        const [Row] = await conn.query(selectHpIdcQuery, hp_id);

        return Row;
    }

    // 헬퍼 마이페이지) 기존 자기소개서 처음 작성
    insertHpPreIdc = async (conn, hp_id, content) => {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() +1;
        let day =date.getDate();
        if(month<10){
            month = '0'+month
        }
        if(day<10){
            day = '0'+day
        }
        let today = year + '-' + month+'-'+day;
        const insertHpPreIdcQuery =  `
            INSERT INTO hp_idc(hp_id,content,date)
            values(?,?,"${today}")
        `;
        const list = [content,hp_id];
        const [Row] = await conn.query(insertHpPreIdcQuery, list);

        return Row;
    }
    
    // 헬퍼 마이페이지) 기존 자기소개서 수정
    updateHpPreIdc = async (conn, content, hp_id) => {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() +1;
        let day =date.getDate();
        if(month<10){
            month = '0'+month
        }
        if(day<10){
            day = '0'+day
        }
        let today = year + '-' + month+'-'+day;
        const updateHpPreIdcQuery =  `
            UPDATE hp_idc 
            SET content = ?, date = "${today}"
            WHERE hp_id = ?
        `;
        const list = [content,hp_id];
        const [Row] = await conn.query(updateHpPreIdcQuery, list);

        return Row;
    }

    // 헬퍼의 식별자 가져오기
    selectMatchingPartner = async (conn, apply_id, mem_id ) => {
        const selectQuery = `
            SELECT hp_id
            FROM progress_list
            WHERE apply_id = ? and mem_id = ?
        `;
        
        const [Result] =  await conn.query(selectQuery, [apply_id, mem_id]);

        return Result;
    }
}

module.exports = HpApplyModel;