import db from "#db/client";
import { createUser } from "#db/queries/users";
import { uploadProduct, getProductList, productList } from "#db/queries/products";
import { createOrder, orderItems} from "#db/queries/orders";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");


const minIndex = 1;
const maxIndex = 10;
function randomNum(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min
};

function getUniqueId(pickedSet, min, max){
  let productId; 
  do {
    productId = randomNum(min, max);}
    while (pickedSet.has(productId));
    pickedSet.add(productId);
    return productId
}

async function seed() {
  const user = await createUser("user_one", "password");
  console.log(user);
  //seed products 
    //loop through productllist, await upload products for each item in list 
    // console.log(productList)
  for (const product of productList){
    // console.log(product)
    await uploadProduct(product)
  }
  //create order, with date, note, userID
  const order = await createOrder('2026-09-30',"thank you", user.id)
    //loop 5 times call order list 
    const pickedProductId = new Set();
    const numberOfItems = 4;

    for ( let i = 0; i < numberOfItems; i++){
      const productId = getUniqueId(pickedProductId, 1, 10)

      await orderItems(order.id, productId, randomNum(1,10));
    };
};

// function randomNum(max, min){
//     return Math.floor(Math.random() * (max - min + 1)) + min
// };

// function recordPickedProducts(){
//   let productId = randomNum(10,1)
//   if (!pickedProducts.includes(productId)){
//     pickedProducts.push(productId)
//     return productId
//   }else {
//     return recordPickedProducts()
//   }
// }