class ApplyModel {

    //Test용
    makeTable = async (conn) => {
        const query = `
        INSERT INTO progress_list(apply_id, mem_id, hp_id, hp_dic_id, is_new, new_idc, is_success, memo, apply_date, start_point, end_point)
            VALUES 
            (24, "id3", "id7", "3", true, "3", 0, "memomemo", 2022-08-31, "서울역", "강남역");
        `

        const query2 = `
        create table hp_idc (
            hp_idc_id int primary key auto_increment,
            hp_id VARCHAR(30),
            content TEXT
            );
        `

        const query3 = `
        INSERT INTO hp_idc(hp_id, content)
        VALUES ("id7","자기소개서내용내용7");
        `

        const query4 = `
        create table progress_list (
            pg_id int primary key auto_increment,
            apply_id INT,
            mem_id VARCHAR(30),
            hp_id VARCHAR(30),
            hp_dic_id VARCHAR(30),
            is_new BOOLEAN,
            new_idc VARCHAR(30),
            is_success INT,
            memo TEXT,
            apply_date DATE,
            start_point VARCHAR(30),
            end_point VARCHAR(30)
            );
        `
        const result = await conn.query(query);

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

    // 신청 목록) 매칭 헬퍼 목록 조회하기
    selectHelperList = async (conn,apply_id) => {
        const query = `
            SELECT hp_id
            FROM progress_list
            WHERE apply_id = ?
        `;

        const [Row] = await conn.query(query,apply_id);

        return Row;
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
        const [Row] = await conn.query(query,mem_id);
        return Row;
    }

    // 지원한 헬퍼) 수락하기/거절하기
    updateHelper = async (conn,is_success,pg_id) => {
        const query = `
        UPDATE progress_list
        SET is_success = ?
        WHERE pg_id = ?
        `;
        const list = [is_success,pg_id];
        const [Row] = await conn.query(query,list);
        return Row;
    }  
}

module.exports = ApplyModel;