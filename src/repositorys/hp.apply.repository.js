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
}

module.exports = HpApplyModel;