import db from "#db/client";

export async function uploadProducts({title, description, price}){
    const sql = `
    INSERT INTO products(title, description, price) VALUES ($1, $2, $3) RETURNING *
    `;
    const{rows:[product]} = await db.query(sql, [title, description, price])
    console.log(product)
    return product;
};

const products = [
{
  title: "apple",
  description: "red and tasty",
  price: 1.00
},
{
  title: "banana",
  description: "yellow and ripe",
  price: 1.10
},
{
  title: "orange",
  description: "very juicy",
  price: 1.00
},
{
  title: "lemon",
  description: " slightly sour",
  price: 0.75
},
{
  title: "lime",
  description: "very sour",
  price: 1.00
},
{
  title: "melon",
  description: "honey dew",
  price: 2.00
},
{
  title: "watermelon",
  description: "jusicy and sweet",
  price: 4.50
},
{
  title: "kiwi",
  description: "tart",
  price: 1.00
},
{
  title: "grapes",
  description: "you get a whole bunch",
  price: 2.50
},
{
  title: "plum",
  description: "dark red ripeness",
  price: 1.50
}
]