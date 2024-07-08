import mongoose, { model, Schema } from "mongoose";

mongoose
  .connect("mongodb://127.0.0.1:27017/paytm")
  .then(function () {
    console.log("connected to db!!");
  })
  .catch((e) => console.log(`${e} oh no, not connected to db`));

const UserSchema = new Schema({
  userName: String,
  firstName: String,
  lastName: String,
  password: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = {
  User,
};
