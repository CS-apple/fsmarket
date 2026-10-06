import {Router} from express
import requireBody from "#middleware/requireBody";

const router = Router();

router.post("/orders", requireBody(["date", "user_id"]), (req, res) => {
    //use getuserbytoken to verify the user
})


export default router
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