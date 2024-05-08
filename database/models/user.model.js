const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const schema = mongoose.Schema;

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
    const salt = await bcrypt.genSalt(12); // Maximum 30
    return bcrypt.hash(password, salt);
  } catch (e) {
    throw e;
  }
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.local.password); // Return true or false (if match or not)
};

const User = mongoose.model("user", userSchema);

module.exports = User;
