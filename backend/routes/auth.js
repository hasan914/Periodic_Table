const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchuser');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const JWT_SECRET = 'victoriasecret';

// ROUTE 1: Creating a User using POST "/api/auth/createuser"
// No Login Require
router.post('/createuser', [
  body('name', 'Enter a valid name'),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 8 characters').isLength({ min: 8 }),
], async (req, res) => {

  let success = false;

  // Returns a bad request in case of an error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }
  
  try {
    // Check whether a user with an email exists already
    let user = await User.findOne({email: req.body.email});
    if (user) {
      return res.status(400).json({success, error: "Sorry a user with this email already exists"});
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });

    const data = {
      user: {
        id: user.id
      }
    }

    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({success, authToken});

  } catch(err) {
    console.log(err);
    res.status(400),json({error: 'Internal Server Error'});
  }

})


// ROUTE 2: Authenticating a User using POST "/api/auth/login"
// No Login Require
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {

  let success = false;
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email, password} = req.body;

  try {
    let user = await User.findOne({email});
    if (!user) {
      return res.status(400).json({success, error: "Email or Password is incorrect"});
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({success, error: "Email or Password is incorrect"});
    }

    const data = {
      user: {
        id: user.id
      }
    }

    const authToken = jwt.sign(data, JWT_SECRET);
    
    success = true;
    res.json({success, authToken});

  } catch(err) {
    console.log(err);
    res.status(400),json({error: 'Internal Server Error'});
  }

})


// ROUTE 3: Get loggedin user details using POST "/api/auth/getuser"
// Login Require

router.post('/getuser', fetchUser, async (req, res) => {

  try {
    userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    res.send(user);
  } catch(err) {
    console.log(err);
    res.status(400),json({error: 'Internal Server Error'});
  }

});

module.exports = router;

