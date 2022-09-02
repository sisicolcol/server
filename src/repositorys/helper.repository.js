class HelperRepository {
    constructor(){}

    //퀵 활동 지원 서비스) 목록 조회하기
    selectQuick = async (conn) => {
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

        const Query = `
        SELECT * FROM apply
        WHERE service_date = "${today}"
        `;
        const [Row] = await conn.query(Query);

        return Row;
    }

    //사전예약 활동 지원 서비스) 목록 조회하기
    selectPre = async (conn) => {
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

        const Query = `
        SELECT * FROM apply
        WHERE service_date != "${today}"
        `;
        const [Row] = await conn.query(Query);

        return Row;
    }
}

module.exports=HelperRepository;