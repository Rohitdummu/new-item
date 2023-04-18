const express=require("express") 
const router=express.Router()
const Controllers=require("../controllers/authcontroller")
const Protect = require("../controllers/authmiddleware")
router.post("/getin",
Controllers.signin
)
  
router.post("/fill",
Controllers.signup
)

router.post("/deleteuser", Protect.authorize,
Controllers.deleteuser
)

router.post("/deactivate",Protect.authorize,
Controllers.deactvuser 
)

router.get("/dash",Protect.authorize,
Controllers.das
)

router.post("/updatepassword", Protect.authorize,
Controllers.updateuser
)

router.post("/reactivate",
Controllers.reactvuser
)

router.post("/updatepwd",Protect.authorize,
Controllers.uppwd
)

module.exports=router