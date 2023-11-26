const authjwt = require("../middleware/auth.jwt");

module.exports = (app) => {
    var router = require('express').Router();
    var book = require('../controller/book.controller');
    var user = require("../controller/user.controller");
    var washing_machine = require('../controller/washing_machine.controller');
    var report = require('../controller/report.controller');

    console.log("Admin routes")
    //Admin with users
    // router.get("/logout",user.Logout)
    router.get("/",authjwt.verifytokenAdmin,user.showalluserAdmin);
    router.put("/:id",authjwt.verifytokenAdmin,user.updateuserAdmin);
    router.delete("/:id",authjwt.verifytokenAdmin,user.deleteuserAdmin);
    //Admin with washing machine
    router.get("/wash",authjwt.verifytokenAdmin,washing_machine.getAllwashing_machine);
    router.post("/wash",authjwt.verifytokenAdmin,washing_machine.New_washing_machine);
    router.put("/wash/:id",authjwt.verifytokenAdmin,washing_machine.update);
    router.delete("/wash/:id",authjwt.verifytokenAdmin,washing_machine.Delete);
    //Admin with report
    router.get("/report",authjwt.verifytokenAdmin,report.showallReport);
    router.delete("/report/:id",authjwt.verifytokenAdmin,report.deleteReport);
    //Admin with booking
    router.get("/booking",authjwt.verifytokenAdmin,book.showallBookingAdmin)
    router.delete("/booking/:id",authjwt.verifytokenAdmin,book.DeleteMyown)

    app.use("/api/admin",router)
}