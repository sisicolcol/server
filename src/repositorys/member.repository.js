
class MemberRepository {
    constructor(){}

    selectUserNameByIndex = async (conn, mem_no) => {
        const selectQuery =`
            SELECT mem_name
            FROM member
            WHERE mem_no = ?
        `;
        const [result] = await conn.query(selectQuery, mem_no);

        return result;
    }

    selectUserTypeByIndex = async (conn, mem_no) => {
        const selectQuery =`
            SELECT mem_type
            FROM member
            WHERE mem_no = ?
        `;
        const [result] = await conn.query(selectQuery, mem_no);

        return result;
    }

    //회원가입
    insertMember = async (conn, memParams) => {
        const query =`
            insert into member(mem_id, password, mem_name, mem_phone, mem_gender, mem_card, mem_address,mem_type)
            values(?,?,?,?,?,?,?,1);
        `;
        const query2 = `
            insert into member(mem_id, password, mem_name, mem_phone, mem_gender, mem_cert,mem_type)
            values(?,?,?,?,?,?,0);
        `;
        if(memParams.length == 7){
            let [result] = await conn.query(query, memParams);
            return result;
        }else{
            let [result] = await conn.query(query2, memParams);
            return result;
        }

    }

    //로그인 확인
    checkId = async (conn,mem_id,password) => {
        const q = `
        select mem_no from member
        where mem_id =? and password=?;
        `
        const arr=[mem_id,password];
        let [result] = await conn.query(q,arr);
        return result;
    }

    selectMemberIdByIdx = async (conn, mem_no) => {
        const selectQuery = `
            SELECT mem_id
            FROM member
            WHERE mem_no = '?';
        `;
        const [result] = await conn.query(selectQuery, mem_no);

        return result;
    }

    selectMemberIdxById = async (conn, mem_id) => {
        const selectQuery = `
            SELECT mem_no
            FROM member
            WHERE mem_id = ?;
        `;
        const [result] = await conn.query(selectQuery, mem_id);

        return result;   
    }

    selectUserType = async (conn, mem_id) => {
        const selectQuery = `
            SELECT mem_type
            FROM member
            WHERE mem_no = ?;
        `;
        const [result] = await conn.query(selectQuery, mem_id);

        return result;   
    }
}

module.exports = MemberRepository;
