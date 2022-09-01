class HelperRepository {
    constructor(){}

    //퀵 활동 지원 서비스) 목록 조회하기
    selectQuick = async (conn) => {
        const applySelectApplyQuery = `SELECT * FROM apply`;
        const [applyRow] = await conn.query(applySelectApplyQuery);

        return applyRow;
    }
}

module.exports=HelperRepository;