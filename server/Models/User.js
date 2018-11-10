const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SALT_I = 10;
require('dotenv').config();

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  name: {
    type: String,
    required: true,
    maxlength: 100
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 100
  },
  cart: {
    type: Array,
    default: []
  },
  history: {
    type: Array,
    default: []
  },
  role: {
    type: Number,
    default: 0
  },
  token: {
    type: String
  }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  } else {
    try {
      const salt = await bcrypt.genSalt(SALT_I);
      const hash = await bcrypt.hash(this.password, salt);

      this.password = hash;

      next();
    } catch (err) {
      next(err);
    }
  }
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = async function(cb) {
  var user = this;
  var token = jwt.sign(user._id.toHexString(), process.env.SECRET);

  user.token = token;

  try {
    //to test error change userSaved to just user
    const userSaved = await user.save();
    cb(null, userSaved);
  } catch (err) {
    //we send error
    if (err) return cb(err);
  }
};

userSchema.statics.findByToken = function(token, cb) {
  var user = this;

  jwt.verify(token, process.env.SECRET, async function(err, decode) {
    try {
      const userVerified = await user.findOne({ _id: decode, token: token });
      cb(null, userVerified);
    } catch (err) {
      if (err) return cb(err);
    }
  });
};

const User = mongoose.model('User', userSchema, 'Users');

module.exports = { User };
