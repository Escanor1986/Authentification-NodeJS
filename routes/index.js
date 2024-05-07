const userRoutes = require("./user.routes");
const authRoutes = require("./auth.routes");
const router = require("express").Router();

router.get("/users", userRoutes);
router.get("/auth", authRoutes);

router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
