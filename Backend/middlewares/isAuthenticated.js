import jwt from "jsonwebtoken";

const isAuthenticated = async (req, resizeBy, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized access, please login",
                success: false
            })
        }
        const decod = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({
                message: "Invalid token, please login again",
                success: false
            })
        }
        req.id = decod.userId;
        next();
    } catch (error) {
        return res.status(500).json({
            message: "Authentication failed",
            success: false
        })
    }
}


export default isAuthenticated;