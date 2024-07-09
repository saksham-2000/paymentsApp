const express = require("express");
const v1Router=require('./routes/index');
const cors=require('cors');
const JWT_SECRET_KEY=require('./config');

const app=express();

app.use(cors());
app.use(express.json())

app.use('/api/v1',v1Router);

const PORT=3000;

app.listen(PORT,()=>{
    console.log("app is listening on "+ PORT);
})

app.get('/',(req,res)=>{
  res.send('hello world!!!');
})


  