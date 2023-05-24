const express = require("express");
const cookieParser = require("cookie-parser");
const groceriesRoute = require("./routes/grocreies")
const marketsRoutes = require("./routes/markets")
const authRoutes = require("./routes/auth")
const session = require("express-session")
require('./database/index')

const app = express();
const PORT = 3001;



//middleware

app.use(express.json());
app.use(express.urlencoded());
app.use((req, res, next) => {
    console.log(req.method)
    next()
})
app.use(cookieParser());
app.use(session({
    secret: "AHJKERSTJOIEIRSTUHIU5U89IU5IUHF",
    resave: false,
    saveUninitialized: false
}))

//Routes
app.use("/api/groceries", groceriesRoute)
app.use("/api/markets", marketsRoutes)
app.use("/api/auth", authRoutes)

//PORT
app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
})

