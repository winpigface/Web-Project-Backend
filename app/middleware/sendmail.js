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
        html:`<div style="width: 1225px; height: 1418px; background: #D9D9D9; border-radius: 51px"></div>
        <img style="width: 489px; height: 487px" src="../public/icon.ico" />
        <div style="color: black; font-size: 64px; font-family: Inter; font-weight: 600; line-height: 83.20px; word-wrap: break-word">Washing Almost Done</div>
        <div style="width: 1041px; height: 602px; background: white; border-radius: 76px"></div>
        <div style="width: 272px; height: 63px; padding-left: 21px; padding-right: 21px; padding-top: 12px; padding-bottom: 12px; background: #69DBDF; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 20px; justify-content: center; align-items: center; gap: 10px; display: inline-flex">
          <div style="color: black; font-size: 32px; font-family: Inter; font-weight: 700; word-wrap: break-word">Go to my wash</div>
        </div>
        <div style="text-align: center; color: #4F4F4F; font-size: 32px; font-family: Inter; font-weight: 700; word-wrap: break-word">Prepare to pick up the laundry<br/>Because now the washing is almost finished<br/><br/> <br/>Thank you for using</div>`
    }
    transporter.sendMail(mail,(err,info)=>{
        if(err) throw err
        sendmail.cancel();
    }) 
  })
    
})

module.exports = sendmail;




