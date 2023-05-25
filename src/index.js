const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session")
const MongoStore = require("connect-mongo");
const passport = require("passport");
// require("./strategies/local")

require("./strategies/discord")

//routes
const groceriesRoute = require("./routes/grocreies")
const marketsRoutes = require("./routes/markets")
const authRoutes = require("./routes/auth")

require('./database/index')

//run express server
const app = express();

//port
const PORT = 3001;



//middleware
app.use(express.json());
app.use(express.urlencoded());

app.use(cookieParser());
app.use(session({
    secret: "AHJKERSTJOIEIRSTUHIU5U89IU5IUHF",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://bellobambo21:bambo@cluster0.rpf4jyq.mongodb.net/?retryWrites=true&w=majority"
    })
}))

app.use((req, res, next) => {
    console.log(`${req.method} : ${req.url}`)
    next()
})


app.use(passport.initialize())
app.use(passport.session())


//Routes
app.use("/api/groceries", groceriesRoute)
app.use("/api/markets", marketsRoutes)
app.use("/api/auth", authRoutes)

//PORT
app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
})

