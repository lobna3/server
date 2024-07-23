const { body, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const prisma = require('../database/prisma.js')



/// validation process for the registration part
const validateRegister = () => [
  body("name").isLength({ min: 7 }).withMessage('Username must be longer than 6 characters'),
  body("email").isEmail().withMessage('Email must be valid'),
  body("password")
    .isLength({ min: 7 }).withMessage('Password must be longer than 6 characters')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/[0-9]/).withMessage('Password must contain at least one digit')
    .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character'),
  body("confirmPassword")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    })
]


//// registarion Logic
const registerUser = async (req, res) => {

    
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        address: '',
        interests: ["Hiking", "Kayaking", "Fishing", "Climbing", "Hiking", "Others"],
        imagesProfile: [],
        gender: 'Men',
        bio: '',
        phoneNumber: '',
        dateOfBirth: new Date(0), 
      },
    });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
}

module.exports = {
  validateRegister,
  registerUser
}
