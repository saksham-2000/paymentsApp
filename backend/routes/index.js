const { Router } = require('express');
const { route } = require('../../../assignments/week-3/03-mongo/routes/admin');
const userRouter=require('./user')
const router=Router();

router.use('/user',userRouter)


  module.exports  = router



