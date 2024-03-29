const Report = require('../model/report.model')



const showallReport = async (req,res) =>{
  try {
    const showall = await Report.showallAdmin()
    res.status(200).send(showall)
  } catch (e) {
    res.status(500).send({message: e.message})
  }
  
}
const addReport = async (req,res) => {

      const {user_id,washing_machine_id,report_log} = req.body
      await Report.add({user_id,washing_machine_id,report_log})
      .then(()=>{
        res.status(200).send()
      })
      .catch((error)=>{
        return res.status(400).send({error: error.name,sqlstate: error.sqlState,message: error.message})
      })
      res.status(200).send(data)

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