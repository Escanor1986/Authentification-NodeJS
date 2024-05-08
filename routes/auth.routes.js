const {
  sessionNew,
  sessionCreate,
  sessionDelete,
  googleAuth,
  googleAuthCb,
} = require("../controllers/auth.controller");
const router = require("express").Router();

router.get("/signin/form", sessionNew);
router.post("/signin", sessionCreate);
router.get("/signout", sessionDelete);
router.get("/google", googleAuth);
router.get("/google/cb", googleAuthCb);

module.exports = router;
