require("dotenv").config();
const mongoose = require("mongoose");
const connectDb = require("./config/db");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorHandler = require("./middleware/errorMiddleware");
const userRoute = require("./route/userRoute");
const taskRoute = require("./route/taskRoute");

const app = express();
const PORT = process.env.PORT || 2000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    next()
})

app.use(cors({
    origin: [process.env.CLIENT_URL, 'http://localhost:5175'],
    credentials: true,
    optionsSuccessStatus: 200,
    methods: 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS'
}))

app.use("/user", userRoute);
app.use('/task', taskRoute)

app.get('/', (req, res) => console.log('Success'));

app.use(errorHandler);

connectDb();

mongoose.connection.once('open', () => {
    console.log('DataBase Connected!');
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
})