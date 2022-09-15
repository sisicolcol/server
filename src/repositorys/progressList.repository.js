
class ProgressListRepository {
    constructor(){}

    selectMemberNamesByPgId = async (conn, pg_id) => {
        const query = `
            SELECT mem_id, hp_id, apply_id
            FROM progress_list
            WHERE pg_id = ?
        `;
        
        const [result] = await conn.query(query, pg_id);

        return result;
    }
}

module.exports = ProgressListRepository;
