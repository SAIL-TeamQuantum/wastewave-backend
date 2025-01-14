const express = require('express')
const cors = require('cors');
require('dotenv').config()
require("./src/config/db");
const userRouter = require('./src/router/userRoute');
const path = require('path');

const app = express()
const PORT = 3878

app.use(cors());
app.use(express.json());
app.use('/api', userRouter); 

app.get("/", (req, res)=> {
    const options = {
        root: path.join(__dirname)
    }
    res.sendFile("index.html", options)
})

app.listen(PORT, console.log("running on colos", PORT))