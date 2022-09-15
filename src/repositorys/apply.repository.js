const { query } = require("express")

class ApplyModel {

    //Test용
    makeTable = async (conn) => {
        const query = `
        INSERT INTO progress_list(apply_id, mem_id, hp_id, hp_dic_id, is_new, new_idc, is_success, memo, apply_date, start_point, end_point)
            VALUES 
            (23, "id3", "id7", "3", true, "3", 0, "memomemo", "2022-08-31", "서울역", "강남역");
        `

        const query2 = `
        create table hp_idc (
            hp_idc_id int primary key auto_increment,
            hp_id VARCHAR(30),
            content TEXT
            );
        `

        const query3 = `
        INSERT INTO member(mem_id, password, mem_name, mem_phone, mem_gender,mem_cert,mem_type)
        VALUES ("hp3","pass3","hpName3","01022221111","F","hpCertTest3",false);
        `

        const query4 = `
        INSERT INTO member(mem_id, password, mem_name, mem_phone, mem_gender,mem_card,mem_address,mem_type)
        VALUES ("mem3","3pass","memName3","01022221111","M","memCard3","memAdd3",true);
        `
        const query5 = `
        update apply set is_success=0;
        `
        const query6 = `
        alter table progress_list drop column is_success;
        `
        const result = await conn.query(query6);

        return result;

    }

    selectApplyList = async (conn) => {
        const applySelectApplyQuery = `SELECT * FROM apply`;
        const [applyRow] = await conn.query(applySelectApplyQuery);

        return applyRow;
    }

    // 시각장애인 활동지원 서비스 신청하기
    insertApply = async (conn, applyParams) => {
        const insertApplyQuery =   `
            INSERT INTO apply(service_time,start_point,end_point,duration,way,service_date,contents,details,mem_id,is_success)
            values(?,?,?,?,?,?,?,?,?,0)
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

    // 신청 목록) 매칭 헬퍼 목록 조회하기
    selectHelperList = async (conn,apply_id) => {
        const q1 = `
            SELECT pg_id, hp_id, status
            FROM progress_list
            WHERE apply_id = ?;
        `;

        const q2 = `
        select mem_name
        from member
        where mem_id = ?
        `
        const [hp_id] = await conn.query(q1,apply_id);

        for(let i=0;i<hp_id.length;i++){
            let hp_name = await conn.query(q2,hp_id[i].hp_id);
            hp_id[i].hp_name = hp_name[0][0].mem_name
        }

        return hp_id;
    }

    //신청 목록) 매칭 헬퍼 이력서 조회하기
    selectHelperResume = async (conn, hp_id) => {
        const query = `
        SELECT content  
        FROM hp_idc
        WHERE hp_id = ?
        `;

        const [Row] = await conn.query(query,hp_id);

        return Row;
    }

    // 지원한 헬퍼) 목록 조회하기
    selectListByHelper = async (conn,mem_id) => {
        const query = `
        SELECT *  
        FROM progress_list
        WHERE mem_id = ?
        `;

        const q2 = `
        select hp_id
        from progress_list
        where mem_id = ?
        `;

        const q3 = `
        select mem_name
        from member
        where mem_id = ?
        `;
        let hp_id = await conn.query(q2,mem_id);
        
        let [Row] = await conn.query(query,mem_id);

        for(let i =0;i<Row.length;i++){
            let hp_name = await conn.query(q3,hp_id[0][i].hp_id);
            hp_name = hp_name[0][0].mem_name
            Row[i].hp_name = hp_name
        }
        return Row;
    }

    // 지원한 헬퍼) 수락하기/거절하기
    updateHelper = async (conn,is_success,pg_id) => {
        const yes_q =`
        update progress_list
        set status=1
        where pg_id =?;
        update apply
        set is_success=1
        where apply_id=?;
        `;
        const no_q = `
        update progress_list
        set status=2
        where pg_id=?;
        `;
        const findApplyId = `
            SELECT apply_id
            FROM progress_list
            WHERE pg_id = ?
        `;
        let apply_id = await conn.query(findApplyId,pg_id);
        apply_id = apply_id[0][0].apply_id;

        if(is_success==1){
            const list = [pg_id,apply_id];
            const [Row] = await conn.query(yes_q,list);
            return Row;
        }else{
            const list = [pg_id];
            const [Row] = await conn.query(no_q,list);
            return Row;
        }
    }  

    //활동지원 서비스 완료
    InsertFinishApply = async (conn,pg_id,overtime) => {
        const query = `
        INSERT INTO success_list(apply_id,overtime)
        values(?,?); 
        update progress_list
        set status = 4
        where pg_id=?;
        update apply
        set is_success = 4
        where apply_id = ?;
        `;
        const findApplyId = `
        SELECT apply_id
        FROM progress_list
        WHERE pg_id = ?
        `;
        let apply_id = await conn.query(findApplyId,pg_id);
        apply_id = apply_id[0][0].apply_id;

        const list = [apply_id,overtime,pg_id,apply_id];
        const [Row] = await conn.query(query,list);
        return Row;
    }  

    //활동지원 서비스 파투
    insertFail = async (conn,pg_id,reason) => {
        const query = `
        INSERT INTO failed_list(apply_id,reason)
        values(?,?); 
        update progress_list
        set status = 3
        where pg_id=?;
        update apply
        set is_success = 3
        where apply_id = ?;
        `;

        const findApplyId = `
        SELECT apply_id
        FROM progress_list
        WHERE pg_id = ?
        `;
        let apply_id = await conn.query(findApplyId,pg_id);
        apply_id = apply_id[0][0].apply_id;

        const list = [apply_id,reason,pg_id,apply_id];
        const [Row] = await conn.query(query,list);
        return Row;

    }  

    //신청목록) 메모 보기
    selectMemo = async (conn,apply_id) => {
        const query = `
        select memo
        from apply
        where apply_id = ?
        `;
        const list = [apply_id];
        const [Row] = await conn.query(query,list);
        return Row;
    }  

    //신청 목록) 메모 수정하기
    updateMemo = async (conn,memo,apply_id) => {
        const query = `
        update apply
        set memo = ?
        where apply_id = ?
        `;
        const list = [memo,apply_id];
        const [Row] = await conn.query(query,list);
        return Row;
    }  

    selectApplyInfo = async (conn, apply_id) => {
        const ApplyInfoQuery = `
            SELECT service_date as '서비스일시', start_point as '출발지', end_point as '목적지'
            FROM apply
            WHERE apply_id = ?
        `;

        const [Row] = await conn.query(ApplyInfoQuery, apply_id);

        return Row;
    }

    selectActiveApplyIdByUserNames = async (conn, member_id, partner_id) => {
        const selectApplyIdQuery = `
            SELECT apply_id
            FROM progress_list
            WHERE (mem_id = ? and hp_id = ?) or (mem_id = ? and hp_id = ?)
        `;

        const [resultRow] = await conn.query(selectApplyIdQuery, [member_id, partner_id, partner_id, member_id]);

        return resultRow;
    }

}

module.exports = ApplyModel;