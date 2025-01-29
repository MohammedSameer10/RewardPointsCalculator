const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/dbConnection');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const {createProjects,checkId} = require('./routes/registerProject');
const updateReviewer=require('./routes/updateReviewer');
const updateAdmin=require('./routes/updateAdmin')


dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:8081', // Replace with the origin of your Vue.js application
}));
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/registerProject',createProjects);
app.use('/checkProject',checkId);
app.use('/project',updateReviewer);
app.use('/p',updateAdmin);

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
