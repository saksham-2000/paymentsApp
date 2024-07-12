const { Router } = require("express");
const { route } = require("../../../assignments/week-3/03-mongo/routes/admin");
const userRouter = require("./user");
const accountRouter = require("./account");
const router = Router();

router.use("/user", userRouter);

router.use("/account", accountRouter);

module.exports = router;
