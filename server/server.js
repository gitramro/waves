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
const { Brand } = require('./Models/Brand');
const { Wood } = require('./Models/Wood');
const { Product } = require('./Models/Product');

// Middlewares
const { auth } = require('./Middleware/Auth');
const { admin } = require('./Middleware/Admin');

//=================================
//             PRODUCTS
//=================================

// BY ARRIVAL
// /articles?sortBy=createdAt&order=desc&limit=4

// BY SELL
// /articles?sortBy=sold&order=desc&limit=100&skip=5
app.get('/api/product/articles', async (req, res) => {
  let order = req.query.order ? req.query.order : 'asc';
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  let limit = req.query.limit ? parseInt(req.query.limit) : 100;

  try {
    const articles = await Product.find()
      .populate('brand')
      .populate('wood')
      .sort([[sortBy, order]])
      .limit(limit)
      .exec();
    res.send(articles);
  } catch (error) {
    if (error) return res.status(400).send(error);
  }
});

/// /api/product/articles_by_id?id=HSHSHSKSK,JSJSJSJS,SDSDHHSHDS,JSJJSDJ&type=array (or single)
app.get('/api/product/articles_by_id', async (req, res) => {
  let type = req.query.type;
  let items = req.query.id;

  if (type === 'array') {
    let ids = req.query.id.split(',');
    items = [];
    items = ids.map(item => {
      return mongoose.Types.ObjectId(item);
    });
  }

  try {
    const docs = await Product.find({ _id: { $in: items } })
      .populate('brand')
      .populate('wood')
      .exec();
    return res.status(200).send(docs);
  } catch (error) {
    if (error) return res.json({ success: false, error });
  }
});

app.post('/api/product/article', auth, admin, async (req, res) => {
  const product = new Product(req.body);

  try {
    const doc = await product.save();
    res.status(200).json({
      success: true,
      article: doc
    });
  } catch (error) {
    if (error) return res.json({ success: false, error });
  }
});

//=================================
//              BRAND
//=================================

app.post('/api/product/brand', auth, admin, async (req, res) => {
  const brand = new Brand(req.body);

  try {
    const doc = await brand.save();
    res.status(200).json({
      success: true,
      brand: doc
    });
  } catch (error) {
    if (error) return res.json({ success: false, error });
  }
});

app.get('/api/product/brands', async (req, res) => {
  try {
    const brands = await Brand.find({});
    res.status(200).send(brands);
  } catch (error) {
    if (error) return res.status(400).send(error);
  }
});

//=================================
//              WOODS
//=================================

app.post('/api/product/wood', auth, admin, async (req, res) => {
  const wood = new Wood(req.body);
  try {
    const doc = await wood.save();
    res.status(200).json({
      success: true,
      wood: doc
    });
  } catch (error) {
    if (error) return res.json({ success: false, error });
  }
});

app.get('/api/product/woods', async (req, res) => {
  try {
    const woods = await Wood.find({});
    res.status(200).send(woods);
  } catch (error) {
    if (error) return res.status(400).send(error);
  }
});

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
