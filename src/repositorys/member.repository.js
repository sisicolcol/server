
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

}

module.exports = MemberRepository;
