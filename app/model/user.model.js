
const sql = require('./db')

require('dotenv').config()

const User = function(user){
    this.email = user.email
    this.password = user.password
    this.username = user.username
    this.phone = user.phone
    this.role = user.role
    this.fine = user.fine
}

User.add = (newuser) => {
    return new Promise((resolved,reject)=>{
        sql.query('INSERT INTO users SET ?',newuser,(err,data)=>{
            if(err) return reject(err)
            else return resolved({id:data.insertId,...newuser})
        })
    }) 
}
User.login = (emailuser) => {
    return new Promise((resolved,reject)=>{
        sql.query('SELECT * FROM users WHERE email = ?',[emailuser],(err,data)=>{
            if(err) return reject(err)
            else return resolved(data)
        })
    })
}
User.update = (id,updateUser) =>{
    return new Promise((resolved,reject)=>{
        sql.query('UPDATE users SET ? WHERE id = ?',[updateUser,id],(err,data)=>{
            if(err) return reject(err)
            else return resolved(data)
        })
    })
}
User.HaveFine = (id) => {
    return new Promise((resolved,reject)=>{
        sql.query('UPDATE users SET fine = 1 WHERE id = ?',[id],(err,data)=>{
            if(err) return reject(err)
            else return resolved(data)
        })
    })
}

// Admin
User.showallAdmin = ()=>{
    return new Promise((resolved,reject)=>{
        sql.query('SELECT id,username,email,phone,role,fine FROM users',(err,data)=>{
            if(err) return reject(err)
            else return resolved(data)
        })
    })
}
User.updateUserAdmin = (id,updateUser) => {
    return new Promise((resolved,reject)=>{
        sql.query('UPDATE users SET ? WHERE id = ?',[updateUser,id],(err,data)=>{
            if(err) return reject(err)
            else return resolved(data)
        })
    })
}
User.deleteUserAdmin = (UserId) =>{
    return new Promise((resolved,reject)=>{
        sql.query('DELETE FROM users WHERE id = ?',[UserId],(err,data)=>{
            if(err) return reject(err)
            else return resolved(data)
        })
    })
}

User.checkuser = (userid) => {
    return new Promise((resolved,reject)=>{
        sql.query(`SELECT email,username,phone FROM users WHERE id = ?`,[userid],(err,data)=>{
            if(err) return reject(err)
            else if(data[0]) return reject(new Error('This user have exist'))
            else return resolved()
        })
    })
}


module.exports = User;