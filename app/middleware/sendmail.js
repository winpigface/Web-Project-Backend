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
      console.log(email);
    let mail = {
        from:  process.env.Mail,
        to:  email,
        subject:"Washing almost done",
        html:`
        <div style="width: 500px; height: 500px; background-color: rgb(251,236,204); border-radius: 51px">
        <div style="text-align: center; color: #4F4F4F; font-size: 32px; font-family: Inter; font-weight: 700; word-wrap: break-word">Prepare to pick up the clothes<br/>Because now the washing is almost finished<br/><br/> <br/>Thank you for using</div>
        </div>
       `
    }
    transporter.sendMail(mail,(err,info)=>{
        if(err) throw err
        sendmail.cancel();
    }) 
  })
    
})

module.exports = sendmail;




