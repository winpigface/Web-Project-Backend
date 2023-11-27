const sql = require('./db')
const moment = require('moment');

require('dotenv').config()
const Book = function(book){
  this.book_date = book.book_date
  this.washing_machine_id = book.washing_machine_id
  this.user_id = book.user_id
  this.book_from = book.book_from
  this.book_to = book.book_to
  this.book_deadline = book.book_deadline
  this.confirm_wash = book.confirm_wash
  this.confirm_finish = book.confirm_finish
  this.Status = book.Status

}

Book.add = (Newbook) =>{
  return new Promise((resolve,reject)=>{
    sql.query('INSERT INTO booking SET ?',Newbook,(err,data)=>{
      if(err) return reject(err)
      else return resolve(data)
    })
  })
}

Book.confirmwash = (id) => {
  return new Promise((resolve,reject)=>{
    sql.query('UPDATE booking SET confirm_wash = 1 WHERE user_id = ?',[id],(err,data)=>{
      if(err) return reject(err)
      else return resolve(data)
    })
  })
}
Book.confirmfinish = (id) => {
  return new Promise((resolve,reject)=>{
    sql.query('UPDATE booking SET confirm_finish = 1 WHERE user_id = ?',[id],(err,data)=>{
      if(err) return reject(err)
      else return resolve(data)
    })
  })
}

Book.showdashboard = ()=>{
  return new Promise((resolve,reject)=>{
    sql.query(`SELECT DISTINCT w.name AS washing_machine_name, DATE_FORMAT(b.book_date,'%y-%m-%d') AS book_date,username,TIME_FORMAT(b.book_from,'%H:%i') AS book_from,TIME_FORMAT(b.book_to,'%H:%i') AS book_to,b.Status  
              FROM booking b 
              INNER JOIN washing_machine w ON b.washing_machine_id = w.id 
              INNER JOIN users u ON b.user_id = u.id 
              WHERE b.Status != 'finish'
              ORDER BY book_from ASC`,
              (err,data)=>{
                  if(err) return reject(err)
                  else return resolve(data)
                 })
  })
}
Book.showbookeachwash = (washid)=>{
  return new Promise((resolve,reject)=>{
    sql.query(`SELECT w.name AS washing_machine_name, DATE_FORMAT(b.book_date,'%y-%m-%d') AS book_date,username,TIME_FORMAT(b.book_from,'%H:%i') AS book_from,TIME_FORMAT(b.book_to,'%H:%i') AS book_to,b.Status  
    FROM booking b  
    INNER JOIN washing_machine w ON b.washing_machine_id = w.id
    INNER JOIN users u ON b.user_id = u.id 
    WHERE  b.washing_machine_id = ?
    ORDER BY washing_machine_id ASC,book_from ASC`,[washid],
    (err,data)=>{
      if(err) return reject(err)
      else return resolve(data)
    })
  })
}


Book.showallAdmin = ()=>{
  return new Promise((resolve,reject)=>{
    sql.query(`SELECT w.name AS washing_machine_name, DATE_FORMAT(b.book_date,'%y-%m-%d') AS book_date,username,TIME_FORMAT(b.book_from,'%H:%i') AS book_from,TIME_FORMAT(b.book_to,'%H:%i') AS book_to,b.Status 
                FROM booking b 
                INNER JOIN washing_machine w ON b.washing_machine_id = w.id 
                INNER JOIN users u ON b.user_id = u.id 
                ORDER BY washing_machine_id ASC,book_from ASC`,
                (err,data)=>{
                  if(err) return reject(err)
                  else return resolve(data)
                })
  })
}
Book.showMyself = (id) =>{
  return new Promise((resolve,reject)=>{
    sql.query(`SELECT w.name AS washing_machine_name,TIME_FORMAT(b.book_from,'%H:%i') AS show_from,b.book_from,b.book_to,TIME_FORMAT(b.book_to,'%H:%i') AS show_to,b.Status  
              FROM booking b 
              INNER JOIN washing_machine w ON b.washing_machine_id = w.id 
              INNER JOIN users u ON b.user_id = ? 
              `,[id],
              (err,data)=>{
                  if(err) return reject(err)
                  else return resolve(data)
                 })
  })
}
Book.checkbooktime = (id,book_from,book_to)=>{
  return new Promise((resolve,reject)=>{
    sql.query(`SELECT b.id 
                FROM booking b 
                WHERE b.washing_machine_id = ? 
                AND (? BETWEEN b.book_from AND b.book_to OR ? BETWEEN b.book_from AND b.book_to)
                LIMIT 1`,[id,book_from,book_to],(err,data)=>{
                  if(err) return reject(err)
                  if(data[0] || book_from < moment().format("HH:mm")) return reject(new Error("You can't book this time"))
                  else return resolve()
                })
  })
}
Book.checkuser = (user_id)=>{
  return new Promise((resolve,reject)=>{
    sql.query(`SELECT user_id FROM booking WHERE user_id = ?`,[user_id],(err,data)=>{
      if(err) reject(err)
      if(data[0]) reject(new Error('you have book already'))
      else resolve()
    })
  })
} 
Book.add = (UserWantToBook) => {
  return new Promise((resolve,reject)=>{
    sql.query(`INSERT INTO booking SET ?`,UserWantToBook,(err,data)=>{
      if(err) return reject(err)
      else return resolve(data)
    })
  })
}
Book.delete =  (user_id) => {
  return new Promise((resolve,reject)=>{
    sql.query(`DELETE FROM booking WHERE user_id = ?`,[user_id],(err,data)=>{
      if(err) return reject(err)
      else return resolve(data)
    })
  })
}
// Check status 
Book.checkConfirmWash = (user_id) =>{
  return new Promise((resolve,reject)=>{
    sql.query(`SELECT user_id,book_from,book_to,book_deadline,Status
                FROM booking WHERE confirm_wash = 1 AND user_id = ?`,[user_id],(err,data)=>{
      if(err) reject(err)
      else resolve(data)
    })
  })
}
Book.checkConfirmFinish = (user_id) =>{
  return new Promise((resolve,reject)=>{
    sql.query(`SELECT user_id,book_from,book_to,book_deadline,Status
                FROM booking WHERE confirm_finish = 1 AND user_id = ?`,[user_id],(err,data)=>{
      if(err) reject(err)
      else resolve(data)
    })
  })
}

Book.ChangeStatusInuse = (user_id) => {
  return new Promise((resolve,reject)=>{
    sql.query(`UPDATE booking SET Status = "inuse" WHERE user_id = ?`,[user_id],(err,data)=>{
      if(err) reject(err)
      else resolve(data)
    })
  })
}

Book.ChangeStatusFinish = (user_id) => {
  return new Promise((resolve,reject)=>{
    sql.query(`UPDATE booking SET Status = "finish" WHERE user_id = ?`,[user_id],(err,data)=>{
      if(err) reject(err)
      else resolve(data)
    })
  })
}
module.exports = Book