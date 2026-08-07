const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {

    try {

        const authHeader = req.header("Authorization");
    
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Invalid authorization format"
            });
        }

        const token = authHeader.split(" ")[1];
         // Decode + verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // putting decoded info inside req
        req.user = decoded;

        next();

    } catch (error) {
        console.log("JWT ERROR:", error.message);

        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });

    }

};

module.exports = auth;