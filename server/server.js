const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Models
const { User } = require('./Models/User');

// Middlewares
const { auth } = require('./Middleware/Auth');

//=================================
//              USERS
//=================================

app.get('/api/users/auth', auth, (req, res) => {
  res.status(200).json({
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    cart: req.user.cart,
    history: req.user.history
  });
});

app.post('/api/users/register', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(200).json({
      success: true
    });
  } catch (e) {
    return res.json({ success: false, err });
  }
});

app.post('/api/users/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.json({
      loginSuccess: false,
      message: 'Auth failed, email not found'
    });
  }
  user.comparePassword(req.body.password, (err, isMatch) => {
    if (!isMatch)
      return res.json({ loginSuccess: false, message: 'Wrong password' });

    if (err)
      return res.json({
        loginSuccess: false,
        message: 'Error, contact support'
      });

    user.generateToken((err, user) => {
      // get the error here but why does it send an empty object?
      if (err) return res.status(400).send(err);
      res
        .cookie('w_auth', user.token)
        .status(200)
        .json({
          loginSuccess: true
        });
    });
  });
});

app.get('/api/users/logout', auth, async (req, res) => {
  try {
    await User.findOneAndUpdate({ _id: req.user._id }, { token: '' });
    return res.status(200).send({
      success: true
    });
  } catch (err) {
    if (err) return res.json({ success: false, err });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});
