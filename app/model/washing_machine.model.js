
const sql = require('./db')

const Washing_Machine = function(washing_machine){
    this.name = washing_machine.name
    this.Status = washing_machine.Status
}

Washing_Machine.showall = ()=>{
    return new Promise((resolved,reject)=>{
        sql.query('SELECT * FROM washing_machine',(err,data)=>{
            if(err) return reject(err)
            else return resolved(data)
        })
    })
}
Washing_Machine.add = (New_Washing_Machine) =>{
    return new Promise((resolved,reject)=>{
        sql.query('INSERT INTO washing_machine SET ?',[New_Washing_Machine],(err,data)=>{
            if(err) return reject(err)
            else return resolved(data)
        })
    })
}

Washing_Machine.update = (id,Update_washing_machine) => {
    return new Promise((resolved,reject)=>{
        sql.query('UPDATE washing_machine SET ? WHERE id = ?',[Update_washing_machine,id],(err,data)=>{
            if(err) return reject(err)
            else return resolved(data)
        })
    })
}

Washing_Machine.deleteWash = (id) => {
    return new Promise((resolved,reject)=>{
        sql.query('DELETE FROM washing_machine WHERE id = ?',[id],(err,data)=>{
            if(err) return reject(err)
            else return resolved(data)
        })
    })
} 
Washing_Machine.Dashboard = () =>{
    return new Promise((resolved,reject)=>{
        sql.query(`SELECT DISTINCT w.id,w.name,w.Status,b.Status,u.username FROM washing_machine w
                    LEFT OUTER JOIN booking b ON w.id = b.washing_machine_id
                    INNER JOIN users u ON u.id = b.user_id `,(err,data)=>{
            if(err) return reject(err)
            else return resolved(data)
        })
    })
}
Washing_Machine.checkStatus = (id)=>{
    return new Promise((resolved,reject)=>{
        sql.query(`SELECT Status FROM washing_machine WHERE id = ?`,[id],(err,data)=>{
            if(err) return reject(err)
            if(data[0].Status != 'ON'){
                 return reject(new Error("this washing machine can't use right now"))
            }
            else return resolved(data)
        })
    })
}


module.exports = Washing_Machine