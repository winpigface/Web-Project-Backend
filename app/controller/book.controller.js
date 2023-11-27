const Book = require('../model/book.model');
const Washing_Machine = require('../model/washing_machine.model')
const book_time = require('../middleware/time')
const moment = require('moment');
require('dotenv').config()
function selectTime(book_from,options){
    let time = moment(book_from,"HH:mm")
    if(options == 1){time.add({"m": 3})}
    if(options == 2){time.add({"h":1}) }
    if(options ==3){time.add({"h":1,"m":30})}
    if(options == 4){time.add({"h":2})}
    return time.format("HH:mm")
}
function bookDeadline(bookto){
    let book_to = moment(bookto,"HH:mm")
    book_to.add(1,"m")
    return book_to.format("HH:mm")

}
////////////
const showbooking_wash = async (req,res) => {
  await Book.showdashboard()
    .then((data)=>{
        res.status(200).send(data)
    })
    .catch((error)=>{
        return res.status(400).send({error: error.name,sqlstate: error.sqlState,message: error.message})
    })
}

const showbooking_eachwash = async (req,res) => {
   await Book.showbookeachwash(req.params.washid)
   .then((data)=>{
        res.status(200).send(data)
   })
   .catch((error)=>{
        return res.status(400).send({error: error.name,sqlstate: error.sqlState,message: error.message})
   })
}
const showallBookingAdmin = async (req,res) => {
   await Book.showallAdmin()
   .then((data)=>{
    res.status(200).send(data)
   }) 
   .catch((error)=>{
    return res.status(400).send({error: error.name,sqlstate: error.sqlState,message: error.message})
   })
}
const showMyself = async (req,res)=>{
    await Book.showMyself(req.params.id)
    .then((data)=>{
        res.status(200).send(data)
       }) 
    .catch((error)=>{
        return res.status(400).send({error: error.name,sqlstate: error.sqlState,message: error.message})
    })
}

const addBooking = async (req,res) => {
try{
   
    const {email,washing_machine_id,book_from,option} = req.body
        const book_obj = {washing_machine_id,
            book_from,
            user_id: req.id,
            book_to: selectTime(book_from,option),
            book_deadline: bookDeadline(selectTime(book_from,option))
        }
    await Washing_Machine.checkStatus(washing_machine_id)

    await Book.checkuser(req.id)


    await Book.checkbooktime(washing_machine_id,book_obj.book_from,book_obj.book_to)


    await Book.add(book_obj)


    await book_time.emit('checkconfirmwash',req.id,{email},moment(book_from,"HH:mm"),moment(book_obj.book_to,"HH:mm"),moment(book_obj.book_deadline,"HH:mm"))
    res.status(200).send({message: "book success",data: book_obj})
}catch(error){
    console.log(error);
    return res.status(400).send({error: error.name,sqlstate: error.sqlState,message: error.message})
}}  

const UpdateConfirmWash = async (req,res) => {
try{
    await Book.confirmwash(req.params.id);
    await Book.ChangeStatusInuse(req.params.id)
    res.status(200).send({message: "Confirm Wash"})
}catch(error){
    return res.status(400).send({error: error.name,sqlstate: error.sqlState,message: error.message})
}
}
const UpdateConfirmFinnish  = async (req,res) => {
    try{
        // await Book.confirmfinish(req.id);
        await Book.delete(id);
        res.status(200).send({message: "Confirm Finish Wash"})
    }catch(error){
        return res.status(400).send({error: error.name,sqlstate: error.sqlState,message: error.message})
    }
}

const Delete =  async (req,res) => {
    try{
        await Book.delete(req.id);
        res.status(200).send({message: "Delete Success"})
    }catch(error){
        return res.status(400).send({error: error.name,sqlstate: error.sqlState,message: error.message})
    }
}
const DeleteAdmin = async (req,res)=>{
    try{
        await Book.deleteAdmin(req.params.username);
        res.status(200).send({message: "Delete Success"})
    }catch(error){
        return res.status(400).send({error: error.name,sqlstate: error.sqlState,message: error.message})
    }
}
const DeleteMyown = async (req,res) =>{
    try{
        await Book.delete(req.params.id);
        res.status(200).send({message: "Delete Success"})
    }catch(error){
        return res.status(400).send({error: error.name,sqlstate: error.sqlState,message: error.message})
    }
}
module.exports = {showbooking_wash,showbooking_eachwash,showMyself,addBooking,UpdateConfirmWash,UpdateConfirmFinnish,showallBookingAdmin,Delete,DeleteMyown,DeleteAdmin}