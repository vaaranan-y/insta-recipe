const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require('config');
// const keys = require("../../config/keys");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const auth = require("../../validation/auth");
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Load User model
const User = require("../../models/User");

router.get('/test', auth, (req, res) => {
	res.status(200).send("Welcome 🙌 ");
  });


// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        t = "blah"
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });
        // newUser.token = t
        // newUser.save()
  // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
        // Create token
        const jwtKey = config.get('JWT_KEY')
        const token = jwt.sign(
          { user_id: newUser._id, email: newUser.email},
          jwtKey
        );
        newUser.token = token;
        newUser.save()
      }
    });
  });


// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  const email = req.body.email;
    const password = req.body.password;
  // Find user by email
    User.findOne({ email }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }
  
      // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        console.log("testing password");
        if (isMatch) {
          // User matched
          console.log("token");
          const jwtKey = config.get('JWT_KEY')
          const token = jwt.sign(
            { id: user._id, email: user.email }, 
            jwtKey,
            {
              expiresIn: "2h",
            });
            user.token = token;
            user.save()
            res.status(200).json(user);
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });

  module.exports = router;
// @route GET api/books/:id
// @description Get single book by id
// @access Public
// router.get("/users", (req, res) => {
//     User.findById(req.params.id)
// 	.then(recipe => res.json(recipe))
// 	.catch(err => res.status(404).json({ norecipesfound: 'No Recipe found' }));
// };