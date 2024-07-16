const jwt  = require("jsonwebtoken");

const verifyToken = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token){
        return res.status(403).send("A token is required for authentication")
    }
    try{
        const decoded = jwt.verify(token, process.env.TOKEN_KEY,);
        req.user = decoded;
        next(); 
    }catch(err){
        return res.status(403).send("Invalid Token")
    }
}

module.exports = verifyToken;