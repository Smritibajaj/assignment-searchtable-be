const router = require("express").Router({
  caseSensitive: true,
  strict: true,
});

const AuthRouter = require("./auth.route");
const UserRouter = require("./user.route");
const CompanyRouter = require('./company.route');
const ImageRouter = require('./image.route');
//Middlewares
const { publicAuthMiddleware } = require("../middlewear/auth");
router.use("/auth", AuthRouter);
router.use("/user", publicAuthMiddleware, UserRouter);
router.use("/companies", publicAuthMiddleware, CompanyRouter);
router.use('/images', publicAuthMiddleware, ImageRouter)

module.exports = router;
