const express = require('express')
require("./src/config/db");
const userRouter = require('./src/router/userRoute'); // Adjust the path to your router file

const app = express()
const PORT = 3878

app.use(express.json());
app.use('/api', userRouter); // '/api/signup' will map to the signup route

app.get("/", (req, res)=> {
    res.send("<h1>Hello World</h1>")
})

app.listen(PORT, console.log("running on colos", PORT))

