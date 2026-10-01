import db from "#db/client";

export async function uploadProducts({date, note, userId}){
    const sql = `
    INSERT INTO orders(date, note, user_id) VALUES $(1, $2, $3) RETURNING *
    `;
    const{rows:[order]} = await db.query(sql, [date, note, userId])
    console.log(order)
    return order;
};

const orders = [
    {
        date: '2026-09-30',
        note: "thank you",
        user_id: 2
    },
    {
    date: '2026-09-30',
    note: "leave at door",
    user_id: 2
    }
]