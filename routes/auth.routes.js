const {
  sessionNew,
  sessionCreate,
  sessionDelete,
} = require("../controllers/auth.controller");
const router = require("express").Router();
const passport = require("passport");

router.get("/signin/form", sessionNew);
router.post(
  "/signin",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/signin/form",
  })
);
router.get("/signout", sessionDelete);

module.exports = router;
