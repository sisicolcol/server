
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


}

module.exports = ChatroomRepository;
