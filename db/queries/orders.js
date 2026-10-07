import db from "#db/client";

export async function createOrder({date, note, userId}){
    const sql = `
    INSERT INTO orders(date, note, user_id) VALUES ($1, $2, $3) RETURNING *
    `;
    const{rows:[order]} = await db.query(sql, [date, note, userId])
    // console.log(order)
    return order;
};

export async function createOrderItems({orderId, productId, quantity}){
    //for seed, loop function as needed 
    //create sql query for orderid, product id and quantitiy 
    //get array from row and pass to variable
    //return variable 
    const sql = `
    INSERT INTO orders_products(order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *`;
    const {rows:[orderedProduct]} = await db.query(sql, [orderId, productId, quantity]);
    return orderedProduct;
};

//NEED FUCNTION TO GET ARRAY OF ORDERS BY USER
export async function getOrdersFromUser(userId){
    const sql = `SELECT * FROM orders WHERE user_id = $1`;
    const {rows:orders} = await db.query(sql, [userId])
    return orders
}

//GET ORDER BY ID 
export async function getOrderById(orderId){
    const sql = `SELECT * FROM orders WHERE id = $1`;
    const {rows:[order]} = await db.query(sql, [orderId])
    if (!order) return null;
    return order;
}

export async function getProductsInOrder(orderId){
    const sql = `
    SELECT * FROM orders_products WHERE order_id = $1
    `;
    const {rows: orderedProducts} = await db.query(sql, [orderId])
    if(orderedProducts.length === 0 )return null;
    return orderedProducts;
}

// //GETORDERBYID
// export async function matchUsersForOrders(id, userId){
//     const sql = `
//     SELECT * FROM orders WHERE id = $1 and user_id = $2
//     `;
//     const {rows:[order]} = await db.query(sql, [id, userId])
//     if(!order) return null;
//     return order;
// }



// async function getProductList(num){
//     const sql =`SELECT * FROM products WHERE ID = ${num}`;
//     const {rows:[product]} = await db.query(sql [num]);
//     return product;
// };

const orders = [
    {
    date: '2026-09-30',
    note: "thank you",
    user_id: 2
    },
    {
    date: '2026-09-30',
    note: "leave at door",
    user_id: 1
    }
]