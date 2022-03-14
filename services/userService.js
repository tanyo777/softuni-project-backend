const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// find user by email (lean)
const findUser = async (email) => {
  const user = await User.findOne({ email }).lean();
  return user;
}


// find user by username
const findUserByUsername = async (username) => {
  const user = await User.findOne({ username });
  return user;
}


// register 
const createUser = async (fullName, username, email, password, confirmPassword) => {

  // check if passwords match
  if(password !== confirmPassword) {
    throw Error("Passwords don't match!");
  }


  // if there is user with the same email or username throw err
  const user = await findUser(email);

  if(user) {
    throw Error("Email already exists!");
  }

  
  const foundUsername = await findUserByUsername(username);

  if(foundUsername) {
    throw Error("Username already exists!");
  }
  

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);


  // create the user
  let newUser = new User({
    fullName, 
    username, 
    email,
    password: hashedPassword
  });

  await newUser.save();


  newUser = await findUser(email);

  // sign token
  const token = await jwt.sign(newUser, process.env.jwtPrivateKey)

  // return token
  return {token};
  //return newUser;
};


// login 
const loginUser = async (email, password) => {

  const user = await findUser(email);

  if(!user) {
    throw Error("Ivalid email or password!");
  }


  // compare passwords

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if(!isPasswordValid) {
    throw Error("Ivalid email or password!");
  }


  // sign token
  const token = await jwt.sign(user, process.env.jwtPrivateKey)
  return token;
}





module.exports = {
  createUser,
  loginUser,
  findUser,
  findUserByUsername
};
