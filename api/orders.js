import {Router} from "express"
import requireBody from "#middleware/requireBody";
import requireUser from "#middleware/requireUser";
import requireOrderOwner from "#middleware/requireOrderOwner";
import { 
        createOrder,
        createOrderItems,
        getOrdersFromUser, 
        getProductsInOrder
        } from "#db/queries/orders";
import { getProductById } from "#db/queries/products";

const router = Router();

router.use(requireUser)

router.post("/", requireBody(["date"]), async (req, res) => {
    // res.send("user from token with body ")
    const { date, note = null } = req.body
    const newOrder = await createOrder({date, note, userId:req.user.id})
    res.status(201).json(newOrder)

})

router.get("/", async (req,res)=>{
const userOrderList = await getOrdersFromUser(req.user.id)
if(userOrderList.length === 0)
res.status(200).json(userOrderList)
})

router.get("/:id", requireOrderOwner, async (req,res)=>{
res.status(200).json(req.order)
})

router.post("/:id/products", requireOrderOwner, requireBody(["productId", "quantity"]), async (req,res)=>{
    const {id} = req.params;
    const {productId, quantity} = req.body
    const product =  await getProductById(productId)
    if(!product) return res.status(400).send("productId references a product that does not exist");
    const orderItem = await createOrderItems({orderId:id, productId:product.id, quantity:quantity })
    res.status(201).json(orderItem);
})

router.get("/:id/products", requireOrderOwner, async (req,res)=>{
const {id} = req.params
const productsInOrder = await getProductsInOrder(id)
res.status(200).json(productsInOrder)
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