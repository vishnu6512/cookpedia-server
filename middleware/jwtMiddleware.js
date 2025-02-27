const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
    console.log("inside middleware");
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json("authorization failed. token is missing");
    }

    const token = authHeader.split(" ")[1];
    if (token) {
        try {
            const jwtResponse = jwt.verify(token, process.env.JWT_SECRET);
            console.log(jwtResponse);
            req.userId = jwtResponse.userId;
            next();
        } catch (err) {
            console.log(err);
            res.status(401).json("authorization failed. invalid token");
        }
    } else {
        res.status(401).json("authorization failed. token is missing");
    }
};

module.exports = jwtMiddleware;