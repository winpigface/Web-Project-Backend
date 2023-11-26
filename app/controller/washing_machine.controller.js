const Washing_Machine = require('../model/washing_machine.model')



const New_washing_machine = async (req,res) => {
  try{
  const {name} = req.body

  await Washing_Machine.add({name})
  .then((New_washmachine)=>{
    res.status(200).send({message: "Add Complete"})
  })
  .catch((error)=>{
    if(error.sqlState == '23000') return res.status(409).send({error: error.name,sqlstate: error.sqlState,message: 'This washing_machine have exist'})
    return res.status(400).send({error: error.name,sqlstate: error.sqlState,message: error.message})
  })
  }catch(error){
    return res.status(500).send({error: error.name,sqlstate: error.sqlState,message: error.message})
  }
  

}
const getAllwashing_machine = async (req,res) =>{
    await Washing_Machine.showall()
    .then((all_wash) => {
        res.status(200).send(all_wash)
    })
    .catch((error)=>{
      return res.status(400).send({error: error.name,sqlstate: error.sqlState,message: error.message})
    })
}
const Dashboard = async (req,res)=>{
  await Washing_Machine.Dashboard()
  .then((all_wash) => {
      res.status(200).send(all_wash)
  })
  .catch((error)=>{
    return res.status(400).send({error: error.name,sqlstate: error.sqlState,message: error.message})
  })
}

const update = async (req,res) => {
     const {name,status} = req.body
     const updatewash = {name,status}

    await Washing_Machine.update(req.params.id,updatewash) 
    .then((data)=>{
      console.log(data);
       res.status(200).send(...updatewash)
    })
    .catch((error)=>{
      if(error.sqlState == '23000') return res.status(409).send({error: error.name,sqlstate: error.sqlState,message: 'This washing_machine have exist'})
      return res.status(400).send({error: error.name,sqlstate: error.sqlState,message: error.message})
    })

    
}
const Delete = async (req,res) => {
  await Washing_Machine.deleteWash(req.params.id)
  .then(
    res.status(200).send({message: "delete success"})
  )
  .catch((error)=>{
    return res.status(400).send({error: error.name,sqlstate: error.sqlState,message: error.message})
  })
}


module.exports = {New_washing_machine,Delete,update,getAllwashing_machine,Dashboard}