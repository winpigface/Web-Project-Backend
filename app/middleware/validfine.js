
const validfine = (req,res,next) =>{
    if(req.fine){
        res.status(400).send({message: "You have to pay fine first",fine: "10 Bath"})
    }
    else next 
    ()
}

module.exports = validfine