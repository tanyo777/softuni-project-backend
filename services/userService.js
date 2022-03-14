const User = require("../models/User");
const bcrypt = require("bcrypt");

// register 
const createUser = async (username, email, password, confirmPassword) => {
  if(password === confirmPassword) {
    const hashedPassword = await bcrypt.hash(password, 10);  
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
  } else {
      throw Error("Passwords don't match!");
  }
};

module.exports = {
  createUser,
};
