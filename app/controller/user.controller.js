const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const expireTime = "1h"; 
require('dotenv').config()
const User = require('../model/user.model');







//////////////
const signup = async (req,res)=>{

  const {email,username,password,phone} = req.body
  var salt = bcrypt.genSaltSync(10);
  const newuser = {email,
    username,
    password: bcrypt.hashSync(password,salt),
    phone
  }
  await User.add(newuser)
  .then((newuser)=>{
    res.status(200).send({message: "Signup complete",newuser: newuser})
  })
  .catch((error)=>{
     if(error.sqlState == '23000') return res.status(409).send({error: error.name,sqlstate: error.sqlState,message: 'This user have already exists'})
     return res.status(400).send({error: error.name,sqlstate: error.sqlState,message: error.message})
  })
}
const login = async (req,res) => {
  const {email,password} = req.body

  await User.login(email)   
  .then((login)=>{
    if(login[0]){
    const checkpassword =  bcrypt.compareSync(password,login[0].password)
    if(checkpassword){
      console.log("HEHE");
      const token = jwt.sign({id: login[0].id,role: login[0].role,fine: login[0].fine},process.env.Usertoken,{expiresIn: expireTime}) 
       res.status(200).send({...login[0],accessToken: token})
    }
    else throw new Error('password is not correct')
  }else throw new Error('not found this user')
  })
  .catch((error)=>{
    return res.status(400).send({error: error.name,sqlstate: error.sqlState,message: error.message})
  })
}

const updateuser = async (req,res)=>{

  const {username,phone} = req.body

  await User.update(req.params.id,{username,phone})
  .then((data)=>{
    console.log(data);
    res.status(200).send({username,phone})
  })
  .catch((error)=>{
    if(error.sqlState == '23000') return res.status(409).send({error: error.name,sqlstate: error.sqlState,message: 'This user have exist'})
    return res.status(400).send({error: error.name,sqlstate: error.sqlState,message: error.message})
  })
}

// ADMIN ///
const showalluserAdmin = async (req,res) =>{
 await User.showallAdmin()
 .then((data)=>{
   res.status(200).send(data)
 })
 .catch((error)=>{
  return res.status(400).send({error: error.name,sqlstate: error.sqlState,message: error.message})
 })
}


const updateuserAdmin = async (req,res) =>{
  const {email,username,phone,role,fine} = req.body

  await User.update(req.params.id,{email,username,phone,role,fine})
  .then((data)=>{
    console.log(data);
    res.status(200).send({email,username,phone,role,fine})
  })
  .catch((error)=>{
    if(error.sqlState == '23000') return res.status(409).send({error: error.name,sqlstate: error.sqlState,message: 'This user have exist'})
    return res.status(400).send({error: error.name,sqlstate: error.sqlState,message: error.message})
  })
}

const deleteuserAdmin = async (req,res) => {
  await User.deleteUserAdmin(req.params.id)
  .then((data)=>{
    console.log(data);
    res.status(200).send({message: `delete user id : ${req.params.id} success`})
  })
  .catch((error)=>{
    return res.status(400).send({error: error.name,sqlstate: error.sqlState,message: error.message})
  })
}



 

module.exports = {signup,login,updateuser,updateuserAdmin,showalluserAdmin,deleteuserAdmin}