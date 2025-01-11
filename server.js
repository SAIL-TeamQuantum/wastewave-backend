const express = require('express')
require("./src/config/db");
const userRouter = require('./src/router/userRoute'); // Adjust the path to your router file
const path = require('path');

const app = express()
const PORT = 3878

app.use(express.json());
app.use('/api', userRouter); // '/api/signup' will map to the signup route

app.get("/", (req, res)=> {
    const options = {
        root: path.join(__dirname)
    }
    res.sendFile("index.html", options)
})

app.listen(PORT, console.log("running on colos", PORT))

