const authjwt = require("../middleware/auth.jwt");
const validfine = require('../middleware/validfine')


module.exports= (app)=>{

    console.log("User routes");
    var user = require("../controller/user.controller")
    var book = require('../controller/book.controller')
    var report = require('../controller/report.controller')

    var router = require('express').Router();
    router.post("/signup",user.signup);
    router.post("/login",user.login);
    // router.get("/logout",user.Logout)
    router.put("/dashboard/profile/:id",authjwt.verifyToken,user.updateuser)
    // router.delete("/dashboard/user",authjwt.verifyToken,user.)

    //user with booking     
    router.get("/dashboard",authjwt.verifyToken,book.showbooking_wash);
    router.get("/dashboard/:washid",authjwt.verifyToken,validfine,book.showbooking_eachwash)
    // router.get("/dashboard/mywash",authjwt.verifyToken,validfine,book.showMyself)
    router.post("/dashboard",authjwt.verifyToken,validfine,book.addBooking)
    router.put("/dashboard/comfirmwash",authjwt.verifyToken,validfine,book.UpdateConfirmWash)
    router.put("/dashboard/finishwash",authjwt.verifyToken,validfine,book.UpdateConfirmFinnish)
    router.delete("/dashboard",authjwt.verifyToken,validfine,book.Delete)
    // router.delete("/dashboard",authjwt.verifyToken,validfine,book.Delete);
    //user with report
    router.post("/dashboard/report",authjwt.verifyToken,validfine,report.addReport)




    app.use("/api",router);
}
