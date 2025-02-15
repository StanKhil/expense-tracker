import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    try{
        const token = req.header("Authorization");
        if(!token){
            return res.status(401).json({message: "Ошибка авторизации"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }
    catch(error){
        res.status(500).json({message: "Ошибка сервера", error});
    }
};
export default authMiddleware;