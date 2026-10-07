import express from "express";
const app = express();
export default app;
import usersRouter from "#api/users"
import ordersRouter from "#api/orders"
import getUserFromToken from "#middleware/getUserFromToken";

app.use(express.json());
app.use(getUserFromToken);

app.use("/users", usersRouter)
app.use("/orders", ordersRouter)


app.use((err, req, res, next)=>{
    console.error(err);
    res.status(500).send("something went wrong")
})



// /products router

//     GET /products sends array of all products
//     GET /products/:id
//         sends 404 if the product with that id does not exist
//         sends the specific product
//     🔒 GET /products/:id/orders
//         sends 404 if the product with that id does not exist (even if the user is logged in!)
//         sends an array of all orders made by the user that include this product

// /orders router

//     🔒 POST /orders
//         sends 400 if request body does not include a date
//         creates a new order by the logged-in user and sends it with status 201
//     🔒 GET /orders sends array of all orders made by the logged-in user
//     🔒 GET /orders/:id
//         sends 404 if the order does not exist
//         sends 403 if the logged-in user is not the user who made the order
//         sends the order with the specified id
//     🔒 POST /orders/:id/products
//         sends 404 if the order does not exist
//         sends 403 if the logged-in user is not the user who made the order
//         sends 400 if the request body does not include a productId and a quantity
//         sends 400 if the productId references a product that does not exist
//         adds the specified quantity of the product to the order and sends the created orders_products record with status 201
//     🔒 GET /orders/:id/products
//         sends 404 if the order does not exist
//         sends 403 if the logged-in user is not the user who made the order
//         sends the array of products in the order
