const nodemailer = require('nodemailer')
const events = require('events');
const schedule = require('node-schedule');
const sendmail = new events.EventEmitter();
require('dotenv').config()
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.Mail,
      pass: process.env.Mailpass
    }
  });

sendmail.on("sendmail",(email,book_sendmail)=>{
  const hour = book_sendmail.hour();
  const minute = book_sendmail.minute();
  const SendMailCron = `${minute} ${hour} * * *`;
  const sendmail = schedule.scheduleJob(SendMailCron,()=>{
    let mail = {
        from:  process.env.Mail,
        to:  email,
        subject:"Washing almost done",
        html:`<div styte="background-color:red">
                  <h1> Wasing is almost finnished </h1> 
              </div>`
    }
    transporter.sendMail(mail,(err,info)=>{
        if(err) throw err
        sendmail.cancel();
    }) 
  })
    
})

module.exports = sendmail;




