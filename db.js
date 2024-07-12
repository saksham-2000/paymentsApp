const mongoose = require('mongoose');

// mongoose
//   .connect("mongodb://127.0.0.1:27017/paytm")
//   .then(function () {
//     console.log("connected to db!!");
//   })
//   .catch((e) => console.log(`${e} oh no, not connected to db`));

  mongoose
  .connect("mongodb+srv://saksham25garg:UdX120Bohfe2geEc@paytmappcluster.drpntkx.mongodb.net/?retryWrites=true&w=majority&appName=paytmAppCluster")
  .then(function () {
    console.log("connected to db!!");
  })
  .catch((e) => console.log(`${e} oh no, not connected to db`));


  

const UserSchema = new mongoose.Schema({
  username: {
    type:String,
    required: true,
  }, 
  firstName: {
    type:String,
    required: true,
  }, 
  lastName: {
    type:String,
    required: true,
  }, 
  password: {
    type:String,
    required: true,
  }
});

const AccountSchema= new mongoose.Schema({
  
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    balance: {
      type:Number,
      required: true
    }

})

const User = mongoose.model("User", UserSchema);
const Account=mongoose.model("Account",AccountSchema);

module.exports = {
  User,
  Account
};
