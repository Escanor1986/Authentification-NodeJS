const { userNew, userCreate } = require("../controllers/user.controller");
const router = require("express").Router();

router.get("new", userNew);
router.get("/", userCreate);

module.exports = router;
