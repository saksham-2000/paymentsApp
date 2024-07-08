const express = require("express");
const v1Router=require('./routes/index');

const app=express();

app.use('/api/v1',v1Router);

const PORT=3000;

app.listen(PORT,()=>{
    console.log("app is listening on "+ PORT);
})

app.get('/',(req,res)=>{
  res.send('hello world!!!');
})


  