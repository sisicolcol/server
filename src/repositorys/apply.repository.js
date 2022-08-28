class ApplyModel {

    selectApplyList = async (conn) => {
        const applySelectApplyQuery = `SELECT * FROM apply`;
        const [applyRow] = await conn.query(applySelectApplyQuery);

        return applyRow;
    }

    // 시각장애인 활동지원 서비스 신청하기
    insertApply = async (conn, applyParams) => {
        const insertApplyQuery =   `
            INSERT INTO apply(service_time,start_point,end_point,duration,way,service_date,contents,details,mem_id)
            values(?,?,?,?,?,?,?,?,?)
        `
        const [applyRow] = await conn.query(insertApplyQuery,applyParams);

        return applyRow;
    }

    // 신청목록) mem_id에 따라 조회하기
    selectApplyByMemID = async (conn, mem_id) => {
        const selectApplyByMemIDQuery =    `
            SELECT *
            FROM apply
            WHERE mem_id = ?
        `;
        const [selectApplyRow] = await conn.query(selectApplyByMemIDQuery, mem_id);

        return selectApplyRow;
    }

    // 신청목록) 자세한 신청 내용 보기
    selectApplyDetail = async (conn,apply_id) => {
        const selectApplyDetailQuery = `
        SELECT *
        FROM apply
        WHERE apply_id = ?
        `;
        const [Row] = await conn.query(selectApplyDetailQuery,apply_id);

        return Row;
    }


}

module.exports = ApplyModel;