const { Router } = require("express")

const router = Router()

//list of items
const groceries = [
    {
        item: "milk",
        quantity: 2,
    },
    {
        item: "milo",
        quantity: 10,
    },
    {
        item: "meat",
        quantity: 5,
    },
];

router.use((req, res, next) => {
    console.log("inside groceries Auth Check middleware")
    console.log(req.user)
    if (req.user) next()
    else res.send(401)

})

//All items
router.get("/", (req, res) => {
    res.send(groceries)

}
);

//Single item
router.get("/:item", (req, res) => {
    console.log(req.cookies)
    const { item } = req.params
    const groceriesItem = groceries.find((g) => g.item === item)
    res.send(groceriesItem)
})

//Add new Item
router.post("/", (req, res) => {
    console.log(req.body);
    groceries.push(req.body);
    res.send(201);
});

//sessions one all items
router.get("/shopping/cart", (req, res) => {
    const { cart } = req.session
    if (!cart) {
        res.send("you have no cart session")
    }
    else {
        res.send(cart)
    }
})


//session all items
router.post('/shopping/cart/item', (req, res) => {
    const { items, quantity } = req.body
    const cartItem = { items, quantity }
    const { cart } = req.session

    if (cart) {
        req.session.cart.items.push(cartItem)
    } else {
        req.session.cart = {
            items: [cartItem]
        }
    }
    res.send(201)
})

module.exports = router