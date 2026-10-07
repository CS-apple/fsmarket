import { getOrderById } from "#db/queries/orders"

export default async function requireOrderOwner(req, res, next){
    const {id} = req.params
    const order = await getOrderById(id)
    if(!order) return res.status(404).send("order does not exist")
    if (order.user_id !== req.user.id) return res.status(403).send("logged-in user is not the user who made the order")
    req.order = order
    next()
}