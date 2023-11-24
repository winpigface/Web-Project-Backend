const jwt = require('jsonwebtoken');
require('dotenv').config()
const verifyToken = (req,res,next)=>{
    const token =req.headers["x-access-token"];
    // const token = req.cookies.user_sid
    if(!token){
        return res.status(403).send({message: "You have to login first"});
    }
    jwt.verify(token,process.env.Usertoken,(err,decoded)=>{
        if(err) return res.status(401).send({message: "Unauthorized"});
        if(decoded.role == "user"){
           req.fine = decoded.fine;
            req.id = decoded.id;
            next();
        }else{res.status(401).send({message: "You can't access this session"});}
    });
};
const verifytokenAdmin = (req,res,next)=>{
    const token =req.headers["x-access-token"];
    // const token = req.cookies.user_sid

    if(!token){
        return res.status(403).send({message: "You have to login first"})
    }
    jwt.verify(token,process.env.Usertoken,(err,decoded)=>{
        if(err) return res.status(401).send({message: "Unauthorized"});
       
        if(decoded.role == "admin"){
            req.id = decoded.id;
            next();
        }else{res.status(401).send({message: "You can't access this session"});}
        
    });
}


module.exports = {verifyToken,verifytokenAdmin};