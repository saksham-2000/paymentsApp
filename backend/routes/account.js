const express = require("express");

const { User, Account } = require("../../db");

const router = express.Router();

const { authMiddleware } = require("../middlewares/middleware");

const mongoose=require("mongoose");

router.get("/", authMiddleware, async (req, res) => {
  const dbUser = await User.findOne({
    _id: req.userId,
  });


  if (dbUser) {
    return res.send({
      userId: req.userId,
      firstName: dbUser.firstName
    });
  }

  return res.send({
    message: "User not found",
  });
});

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
 
  const { to, amount } = req.body;

  const fromAccount = await Account.findOne({
    userId: req.userId,
  })

  if (!fromAccount || fromAccount.balance < amount || amount<=0) {
   
    return res.status(400).send({
      message: "Invalid sender account/Insufficient Balance",
    });
  }

  const toAccount = await Account.findOne({
    userId: to,
  })

  if (!toAccount) {
    
    return res.status(400).json({
      message: "Invalid receiver account",
    });
  }

  // performing transfer

  await Account.updateOne(
    {
      userId: req.userId,
    },
    {
      $inc: {
        balance: -amount,
      },
    }
  )

  await Account.updateOne(
    {
      userId: to,
    },
    {
      $inc: {
        balance: amount,
      },
    }
  )


return res.send({
    message: "Transfer successful"
})

});


// ACID transaction (not working rn) (need replica set?)
router.post("/transfer2", authMiddleware, async (req, res) => {
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
