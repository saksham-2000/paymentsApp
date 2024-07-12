const express = require("express");

const { User, Account } = require("../../db");

const router = express.Router();

const { authMiddleware } = require("../middlewares/middleware");

const mongoose=require("mongoose");

router.get("/balance", authMiddleware, async (req, res) => {
  const dbAccount = await Account.findOne({
    userId: req.userId,
  });

  if (dbAccount) {
    return res.send({
      userId: req.userId,
      balance: dbAccount.balance,
    });
  }

  return res.send({
    message: "User not found",
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  const { to, amount } = req.body;

  const fromAccount = await Account.findOne({
    userid: req.userId,
  }).session(session);

  if (!fromAccount || fromAccount.balance < amount) {
    await session.abortTransaction();
    return res.status(400).send({
      message: "Invalid sender account",
    });
  }

  const toAccount = await Account.findOne({
    userId: to,
  }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid receiver account",
    });
  }

  return res.send({
    message: "checkpoint successful"
})

  // performing transfer

  await Account.updateOne(
    {
      userId: req.userId,
    },
    {
      $inc: {
        balance: amount,
      },
    }
  ).session(session);

  await Account.updateOne(
    {
      userId: to,
    },
    {
      $inc: {
        balance: -amount,
      },
    }
  ).session(session);


  // committing the transaction
  await session.commitTransaction();

return res.send({
    message: "Transfer successful"
})

});

module.exports = router;
