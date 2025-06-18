const jwt = require("jsonwebtoken");
require("dotenv").config();

const key = process.env.JWT_SECRET

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    
    if (!token) {
        return res.status(401).json({ message: "Access Denied: No token provided" });
    }

    try {
        const data = jwt.verify(token, key);
        req.user = data;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

module.exports = verifyToken;