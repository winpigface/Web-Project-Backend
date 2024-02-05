const moment = require('moment')
const schedule = require('node-schedule');
const sendMail = require('./sendmail.js')
const events = require('events');
const Book = require('../model/book.model');
const User = require('../model/user.model.js');
const BookingEvent = new events.EventEmitter();
require('dotenv').config()


BookingEvent.on('checkconfirmwash', async (id,email,book_from,book_to,book_deadline)=>{
const hour = moment(book_from,"HH:mm").add({'m':1}).hour()
const minute = moment(book_from,"HH:mm").add({'m':1}).minute()
const cron = `${minute} ${hour} * * *`;

const CheckConfirmWash = await schedule.scheduleJob(cron,async ()=>{
   console.log("Check");
      const User_book =  await Book.checkConfirmWash(id)
      if(User_book[0]){
         console.log("Found");
         sendMail.emit("sendmail",email,moment(book_to,"HH:mm").subtract({'m':1}))
         BookingEvent.emit('changeStatustofinish',id,moment(book_to,"HH:mm"))
         BookingEvent.emit('checkconfirmfinish',id,moment(book_deadline,"HH:mm"))
         CheckConfirmWash.cancel()
      }
      else{
         
         await Book.delete(id)
         CheckConfirmWash.cancel()
      }
})
})

BookingEvent.on('changeStatustofinish',(id,book_to)=>{
const hour = moment(book_to,"HH:mm").hour()
const minute = moment(book_to,"HH:mm").minute()
const cron = `${minute} ${hour} * * *`;

const ChangeToFinish = schedule.scheduleJob(cron,async ()=>{
   console.log("ToFinish");
   await Book.ChangeStatusFinish(id)
   ChangeToFinish.cancel();
})
})
BookingEvent.on('checkconfirmfinish',(id,book_deadline)=>{
const hour = moment(book_deadline,"HH:mm").hour()
const minute = moment(book_deadline,"HH:mm").minute()

const cron = `${minute} ${hour} * * *`;
const CheckConfirmFinish = schedule.scheduleJob(cron,async ()=>{

   const User_book =  await Book.checkConfirmFinish(id)
   if(User_book[0]){

      // await Book.delete(id);  
      CheckConfirmFinish.cancel();
   }
   else{
      await User.HaveFine(id);
      await Book.delete(id);
      CheckConfirmFinish.cancel();
   }

})
   
})

module.exports = BookingEvent








