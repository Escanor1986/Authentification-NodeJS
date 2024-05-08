const router = require("express").Router();
const { userNew, userCreate } = require("../controllers/user.controller");

router.get("/new", userNew);
router.post("/", userCreate); // Assurez-vous que cette route correspond à la méthode POST

module.exports = router;
