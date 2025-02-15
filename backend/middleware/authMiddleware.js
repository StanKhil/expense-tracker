import jwt, { decode } from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    let decoded = null;
    try{
        const token = req.header("Authorization")?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Ошибка авторизации" });
        }
        decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }
    catch(error){
        console.log("Error during getting expenses:", error);
        console.log("secret", process.env.JWT_SECRET);
        console.log("token", decoded);
        res.status(500).json({message: "Ошибка сервера", error});
    }
};
export default authMiddleware;