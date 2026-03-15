import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

const authMiddleware = async (req, res, next) => {
    try{
        let token;

        //Get token From Header:
        if(req.headers.authorization?.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1];
        }

        //No Token:
        if(!token){
            return res.status(401).json({message: "Not Authorized"});
        }

        //Verify Token:
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        //Atach User:
        req.user = await User.findById(decode.id).select("-password");

        next();
    }
    catch(error){
        res.status(401).json({message: "Token Failed"});
    }
}

export default authMiddleware;