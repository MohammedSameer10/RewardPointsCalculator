const express = require('express');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const signUp = require('../model/signUp');
const loginRouter = express.Router();

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  console.log(`Login attempt for username: ${username}`);

  const user = await signUp.findOne({ username });

  if (user) {
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
     return res.status(200).json({ message: 'Login successful', user });
    } else {
     return res.status(401).json({ message: 'Invalid username or password' });
    }
  } else {
   return res.status(401).json({ message: 'Invalid username or password' });
  }
});

loginRouter.post('/', loginUser);
module.exports = loginRouter;
