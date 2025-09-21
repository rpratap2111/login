const { ensureAuthenticated } = require("../Middlewares/Auth");

const router = require("express").Router();



router.get("/", ensureAuthenticated, (req, res) => {
    console.log(req.user);
    res.status(200).json([
        {
            name: "mobile",
            price: 1000,
        },
        {
            name: "laptop",
            price: 2000,
        },
        {
            name: "tablet",
            price: 500,
        },
        {
            name: "watch",
            price: 200,
        },
    ])
});

module.exports = router;