
class MessageRepository {
    constructor(){}

    selectUserChatRooms = async (connection, mem_no) => {
        const selectQuery =`
            SELECT message.content, user1.mem_name as 'blind_user_name',user2.mem_name as 'helper_name', user1.mem_no as 'blind_user_no', user2.mem_no as 'helper_no', message.chat_room_no,
            case
                when timestampdiff(second, message.created_at, current_timestamp) < 60
                    then CONCAT(TIMESTAMPDIFF(second, message.created_at , NOW()), '초')
                when timestampdiff(minute, message.created_at, current_timestamp) < 60
                    then CONCAT(TIMESTAMPDIFF(minute, message.created_at , NOW()), '분')
                when timestampdiff(hour , message.created_at, current_timestamp) < 24
                    then CONCAT(TIMESTAMPDIFF(hour, message.created_at , NOW()), '시간')
                when timestampdiff(day, message.created_at, current_timestamp) < 30
                    then CONCAT(TIMESTAMPDIFF(day, message.created_at, NOW()), '일')
                else
                    timestampdiff(year , message.created_at, current_timestamp)
            end as time
            FROM message
            INNER JOIN (
                SELECT max(message_no) as last_message_no , chat_room_no, content, reciver_no, sender_no
                from message
                where sender_no = ? or reciver_no = ?
                GROUP BY chat_room_no
            ) last_message
            on last_message.chat_room_no = message.chat_room_no
                    and last_message.last_message_no = message.message_no
            inner JOIN member as user1 on user1.mem_no = last_message.reciver_no
            inner JOIN member as user2 on user2.mem_no = last_message.sender_no
        `;
        const [result] = await connection.query(selectQuery, [mem_no, mem_no]);

        return result;
    }

    selectUserChats = async (conn, chat_room_no) => {
        const selectChatsQuery = `
            SELECT content as '메시지', DATE_FORMAT(updated_at, '%H:%i') as '전송시각', sender_no
            FROM message
            WHERE chat_room_no = ?
            ORDER BY message_no
        `;
        const [result] = await conn.query(selectChatsQuery, chat_room_no);

        return result;
    }

    insertUserChat = async (conn, chat_room_no, me_mem_no ,partner_mem_no, content) => {
        const insertChatQuery = `
            INSERT INTO message(chat_room_no, sender_no, reciver_no, content)
            values(?,?,?,?)
        `;
        const [result] = await conn.query(insertChatQuery, [chat_room_no, me_mem_no, partner_mem_no, content]);

        return result;
    }

}

module.exports = MessageRepository;
