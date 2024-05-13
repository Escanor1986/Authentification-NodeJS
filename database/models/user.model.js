const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const schema = mongoose.Schema;
require("dotenv").config();

const userSchema = schema({
  local: {
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String },
  },
  username: String,
});

userSchema.statics.hashPassword = async password => {
  try {
    const pepper = process.env.PEPPER_SECRET;
    const uniqueSalt = process.env.UNIQUE_SALT;
    const salt = await bcrypt.genSalt(12); // Maximum 30

    const saltedPassword = password + uniqueSalt + pepper;

    const hashedSaltedPassword = crypto
      .createHmac("sha256", pepper)
      .update(saltedPassword)
      .digest("hex");

    return bcrypt.hash(hashedSaltedPassword, salt);
  } catch (e) {
    throw e;
  }
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.local.password); // Return true or false (if match or not)
};

const User = mongoose.model("user", userSchema);

module.exports = User;
