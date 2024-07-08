const express=require("express");

const router=express.Router();

router.get('/',(req,res)=>{
    res.send('hello api user');
  })

  module.exports=router;