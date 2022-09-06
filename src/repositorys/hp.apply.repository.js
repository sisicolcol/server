class HpApplyModel {
    
    // 헬퍼 퀵/사전 활동 지원 서비스) 지원하기 -기존 자기소개서 보기
    selectHpIdc = async (conn, hp_id) => {
        const selectHpIdcQuery = `
            SELECT content
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
        const insertHpPreIdcQuery =  `
            INSERT INTO hp_idc(hp_id,content)
            values(?,?)
        `;
        const list = [content,hp_id];
        const [Row] = await conn.query(insertHpPreIdcQuery, list);

        return Row;
    }
    
    // 헬퍼 마이페이지) 기존 자기소개서 수정
    updateHpPreIdc = async (conn, content, hp_id) => {
        const updateHpPreIdcQuery =  `
            UPDATE hp_idc 
            SET content = ? 
            WHERE hp_id = ?
        `;
        const list = [content,hp_id];
        const [Row] = await conn.query(updateHpPreIdcQuery, list);

        return Row;
    }
}

module.exports = HpApplyModel;