
class ChatroomRepository {
    constructor(){}

    selectUserChatRooms = async (conn, mem_no, partner_mem_no ) => {
        const selectQuery =`
            SELECT chat_room_no
            FROM chat_room
            where (blind_user_no = ? and helper_no = ?) or (blind_user_no = ? and helper_no = ?)
        `;
        const [result] = await conn.query(selectQuery, [mem_no, partner_mem_no, partner_mem_no, mem_no]);

        return result;
    }

    insertNewRoom = async (conn, apply_id, mem_no, partner_mem_no) => {
        const insertQuery = `
            INSERT INTO chat_room(apply_id, blind_user_no, helper_no)
            VALUES(?,?,?);
        `;
        const [insertResult] = await conn.query(insertQuery, [apply_id, mem_no, partner_mem_no] );

        return insertResult;
    }

    updateRoomStatus = async (conn, apply_id, mem_id) => {
        const updateQuery = `
            update chat_room
            set status = 1
            where apply_id =? and blind_user_id = ?
        `;
        const [Result] = await conn.query(updateQuery, [apply_id, mem_id]);

        return Result;
    }
    
}

module.exports = ChatroomRepository;
