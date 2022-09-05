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
            INSERT INTO progress_list(apply_id, mem_id, hp_id, hp_idc_id, is_new, new_idc, is_success, memo, apply_date, start_point, end_point)
            values(?,?,?,?,?,?,?,?,?)
        `
        const [applyRow] = await conn.query(insertHpApplyQuery,Params);

        return applyRow;
    }
    
    // 헬퍼 마이페이지) hp_idc에 이미 기본 자기소개서가 있는지 확인
    selectHpIdc = async (conn, hp_id) => {
        //hp_idc에 hp_id가 있으면 update, 없으면 insert
        //member에 mem_name, mem_id update
        const selectHpIdcQuery =  `
            SELECT content
            FROM hp_idc
            WHERE hp_id = ?
        `;
        const [applyRow] = await conn.query(selectHpIdcQuery,hp_id);

        return applyRow;
    }

    // 헬퍼 마이페이지) 프로필 및 자기소개서 설정
    insertHpProfile = async (conn, Params) => {
        //hp_idc에 hp_id가 있으면 update, 없으면 insert
        //member에 mem_name, mem_id update
        const insertHpProfileQuery =  `
            INSERT INTO hp_idc(hp_id,content)
            values(?,?); 
            UPDATE member
            SET mem_name = ?, mem_id = ?
            WHERE mem_id = ?
        `;
        const list = [hp_id, content, mem_name, mem_id];
        const [applyRow] = await conn.query(insertHpProfileQuery,list);

        return applyRow;
    }
}

module.exports = HpApplyModel;