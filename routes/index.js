const userRoutes = require("./user.routes");
const authRoutes = require("./auth.routes");
const router = require("express").Router();

router.use("/users", userRoutes); // fixed issue !!! router.use INSTEAD OF router.get
router.use("/auth", authRoutes);

router.get("/", (req, res, next) => {
  console.log(req.user);
  res.render("index");
});

module.exports = router;
