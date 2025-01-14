const jwt = require('jsonwebtoken')

const protect = (req, res, next) => {
    const bearer = req.headers.authorization
    if (!bearer) {
        res.status(201).json({
            message: "not a valid token",
        })
        return      
    }
    const [, token] = bearer.split(" ");
    if (!token) {
        res.status(201).json({
            message: "not a valid token",
        })
        return 
    }
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        req.user = user
        next()
    }
    catch (error) {
        res.status(201).json({
            message: "An error occured",
            error
        })
    }
}

module.exports = protect