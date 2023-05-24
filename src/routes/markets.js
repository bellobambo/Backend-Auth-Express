const { Router } = require("express")

const router = Router()


router.use((req, res, next) => {
    if (req.session.user) next()
    else res.send(401)

})

const superMarket = [
    {
        id: 1,
        store: "whole food",
        miles: 0.6
    },
    {
        id: 2,
        store: "trader joe",
        miles: 2.5
    },
    {
        id: 3,
        store: "bello",
        miles: 2.8

    },
    {
        id: 4,
        store: "trader joe",
        miles: 2.8

    },
    {
        id: 5,
        store: "mcDonald",
        miles: 5.0

    },
]



router.get("/", (req, res) => {
    const { miles } = req.query
    const parsedMiles = parseInt(miles)

    if (!isNaN(parsedMiles)) {
        const filteredStores = superMarket.filter((s) => s.miles <= parsedMiles)
        res.send(filteredStores)
    } else
        res.send(superMarket)
})

module.exports = router