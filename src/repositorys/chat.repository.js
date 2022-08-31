
class ChatRepository {
    constructor(){}

    selectUserChatRooms = async (connection, mem_no) => {
        const selectQuery =`
            SELECT member.mem_name, message.content,
            case
                when timestampdiff(second , message.created_at, current_timestamp) < 60
                    then CONCAT(TIMESTAMPDIFF(second, message.created_at , NOW()), '초')
                when timestampdiff(minute, message.created_at, current_timestamp) < 60
                    then CONCAT(TIMESTAMPDIFF(minute, message.created_at , NOW()), '분')
                when timestampdiff(hour , message.created_at, current_timestamp) < 24
                    then CONCAT(TIMESTAMPDIFF(hour, message.created_at , NOW()), '시간')
                when timestampdiff(day, message.created_at, current_timestamp) < 30
                    then CONCAT(TIMESTAMPDIFF(day, message.created_at, NOW()), '일')
                else
                    timestampdiff(year , message.created_at, current_timestamp)
            end as '전송시각'
            FROM chat_room
                INNER JOIN member on member.mem_no = chat_room.helper_no
                INNER JOIN message on message.sender_no or message.reciver_no = chat_room.helper_no
            WHERE blind_user_no = ?
            GROUP BY chat_room.chat_room_no
        `;
        const [result] = await connection.query(selectQuery, mem_no);

        return result;
    }

}

module.exports = ChatRepository;
