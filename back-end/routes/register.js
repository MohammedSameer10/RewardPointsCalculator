const express = require('express');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const signUp = require('../model/signUp');
const registerRouter = express.Router();

const registerUser = asyncHandler(async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPasswordAdmin = await bcrypt.hash('admin123', salt);
  const hashedPasswordReviewer = await bcrypt.hash('reviewer123', salt);
  const hashedPasswordStudent = await bcrypt.hash('student123', salt);
  const user = await signUp.create({
    username: 'Admin',
    password: hashedPasswordAdmin,
  });

  const user1 = await signUp.create({
    username: 'reviewer',
    password: hashedPasswordReviewer,
  });
  const user2 = await signUp.create({
    username: 'student',
    password: hashedPasswordStudent,
  });
  const user3 = await signUp.create({
    username: 'sameer',
    password: hashedPasswordStudent,
  });

  console.log(`User is created: ${user}`);
  console.log(`User is created: ${user1}`);
  console.log(`User is created: ${user2}`);

  if (user && user1) {
    res.status(201).json({ message: 'Users created successfully' });
  } else {
    res.status(400);
    throw new Error('User data is not valid');
  }
});

registerRouter.post('/', registerUser);
module.exports = registerRouter
