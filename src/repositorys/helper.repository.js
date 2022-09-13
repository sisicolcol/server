class HelperRepository {
    constructor(){}

    // 활동 지원 서비스 신청하기


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
        SELECT *, 
            (   SELECT mem_name 
                FROM member 
                WHERE member.mem_id = apply.mem_id) AS "mem_name" 
        FROM apply
        WHERE service_date = "${today}";
        `
        ;

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
        SELECT *, 
            (   SELECT mem_name 
                FROM member 
                WHERE member.mem_id = apply.mem_id) AS "mem_name" 
        FROM apply
        WHERE service_date != "${today}"
        `;
        
        const [Row] = await conn.query(Query);

        return Row;
    }

    //나의 지원 목록) 조회하기
    selectMyApply = async (conn,hp_id) => {
        const Query = `
        SELECT * FROM progress_list
        WHERE hp_id = ?
        `;
        const [Row] = await conn.query(Query,hp_id);

        return Row;
    }

    //나의 지원 목록) 메모 보기
    selectMemo = async (conn,hp_id,apply_id) => {
        const query = `
        select hp_memo
        from progress_list
        where apply_id =? and hp_id = ?
        `;
        const list = [hp_id,apply_id];
        const [Row] = await conn.query(query,list);
        return Row;
    }  

    //나의 지원 목록) 메모 수정하기
    updateMemo = async (conn,memo,hp_id,apply_id) => {
        const query = `
        update progress_list
        set hp_memo = ?
        where apply_id =? and hp_id = ?
        `;
        const list = [memo,hp_id,apply_id];
        const [Row] = await conn.query(query,list);
        return Row;
    }  
}

module.exports=HelperRepository;