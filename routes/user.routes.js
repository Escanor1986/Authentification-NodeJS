const router = require("express").Router();
const { userNew, userCreate } = require("../controllers/user.controller");

router.get("/new", userNew);
router.post("/", userCreate);

module.exports = router;
