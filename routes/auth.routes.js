const {
  sessionNew,
  sessionCreate,
  sessionDelete,
} = require("../controllers/auth.controller");
const router = require("express").Router();
const passport = require("passport");

router.get("/signin/form", sessionNew);
router.post("/signin", sessionCreate);
router.get("/signout", sessionDelete);

module.exports = router;
