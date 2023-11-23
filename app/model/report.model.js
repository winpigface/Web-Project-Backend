const sql = require('./db')

const Report = function(report){
    this.report_date = report.report_date
    this.washing_machine_id = report.washing_machine_id
    this.user_id = report.user_id
    this.report_log = report.report_log
}


Report.add = (Newreport) =>{
    return new Promise((resolve,reject)=>{
        sql.query('INSERT INTO report SET ?',Newreport,(err,data)=>{
            if(err) return reject(err)
            else return resolve(...Newreport)
        })
    })
} 
Report.showallAdmin = () =>{
    return new Promise((resolve,reject)=>{
        sql.query('SELECT * FROM report',(err,data)=>{
        if(err) return reject(err)
        else return resolve(data)
        })
       
    })
}

Report.delete = (id) => {
    return new Promise((resolve,reject)=>{
        sql.query('DELETE FROM report WHERE id = ?',[id],(err,data)=>{
        if(err) return reject(err)
        else return resolve(data)
        })
       
    })
}
module.exports = Report;