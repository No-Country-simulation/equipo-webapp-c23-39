const { Router } = require("express");

const router = Router();


  

router.use("/admin", require("./admin"));
router.use("/auth", require("./auth"));



module.exports = router;
