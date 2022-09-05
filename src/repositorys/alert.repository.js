class AlertModel {
    // 기기 토큰 받아와서 테이블에 저장하기 
    updateToken = async (conn, mem_token, mem_id) => {
        const query = `
            UPDATE member
            SET mem_token = ?
            WHERE mem_id = ?
        `;
        const [Row] = await conn.query(query, mem_token, mem_id);
        return Row;
    }
}

module.exports = AlertModel;