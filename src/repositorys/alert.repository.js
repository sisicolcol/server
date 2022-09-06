class AlertModel {
    // 기기 토큰 받아와서 테이블에 저장하기 
    updateToken = async (conn, mem_token, mem_id) => {
        const query = `
            UPDATE member
            SET mem_token = ?
            WHERE mem_id = ?
        `;
        const list = [mem_token, mem_id];
        const [Row] = await conn.query(query, list);
        return Row;
    }

    // 알림 목록
    selectAlertList = async (conn, mem_id) => {
        const query = `
            SELECT message
            FROM service_alert
            WHERE mem_id = ?
        `;
        const [Row] = await conn.query(query, mem_id);
        return Row;
    }
    
}

module.exports = AlertModel;