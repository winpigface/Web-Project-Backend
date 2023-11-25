const Report = require('../model/report.model')



const showallReport = async (req,res) =>{
  try {
    const showall = await Report.query() 
    res.status(200).send(showall)
  } catch (e) {
    res.status(500).send({message: e})
  }
  
}
const addReport = async (req,res) => {

      const {user,washing_machine,report_log} = req.body
      await Report.add({user,washing_machine,report_log})
      .then((data)=>{
        res.status(200).send(data)
      })
      .catch((error)=>{
        return res.status(400).send({error: error.name,sqlstate: error.sqlState,message: error.message})
      })
      res.status(200).send(add)

}
const deleteReport = async (req,res) => {

 await Report.delete(req.params.id)
 .then((data)=>{
  console.log(data);
  res.status(200).send({message: `delete report id : ${req.params.id} success`})
})
 .catch((error)=>{
  return res.status(400).send({error: error.name,sqlstate: error.sqlState,message: error.message})
 })
   
}
module.exports = {addReport,deleteReport,showallReport}