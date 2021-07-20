const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config({ path: "./config.env" })
const app = express()

///////////
//ROUTES//
/////////

const authRouter = require('./route/auth')
const todoRouter = require('./route/todo')



const DB = process.env.DB;

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err))



app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// ---ROUTES------
app.use('/api/users', authRouter)
app.use('/api/todos', todoRouter)


app.listen(process.env.PORT, () => {
    console.log(`Server is Running at PORT ${process.env.PORT}`);
})
