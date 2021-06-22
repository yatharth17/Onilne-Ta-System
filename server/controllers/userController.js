import express from 'express';
import jwt from 'jsonwebtoken';
import pkg from 'express-validator';
const { validationResult } = pkg;
import { config } from '../store/config.js';

import {
  generateHashedPassword,
  generateServerErrorCode,
  registerValidation,
  loginValidation,
} from '../store/utils.js';

import {
  SOME_THING_WENT_WRONG,
  USER_EXISTS_ALREADY,
  WRONG_PASSWORD,
  USER_DOES_NOT_EXIST,
} from '../store/constant.js';

import User  from '../models/user.js';
import TaSchema from '../models/taData.js';
import Teacher from '../models/teacher.js';

const userController = express.Router();

const createUser = async (name, email, password, type) => {
  const data = {
    name,
    email,
    hashedPassword: generateHashedPassword(password),
  };
  // console.log(type); 
  if(type === 'student')
    return await new User(data).save();
  
  else if(type === 'ta')
    return await new TaSchema(data).save();

  else
   return await new Teacher(data).save();
}




const getUsers = async (email, type) => {
   
  if(type === "student")
    return await User.findOne({ email });

  else if(type === "ta")
    return await TaSchema.findOne({ email });
  
  else 
    return await Teacher.findOne({ email });
};

/**
 * GET/
 * retrieve and display all Users in the User Model
 */

userController.get('/', (req, res) => {
  User.find({}, (err, result) => {
    res.status(200).json({ data: result });
  });
});

/**
 * POST/
 * Register a user
 */

userController.post('/register', registerValidation, async (req, res) => {
  console.log(req)
  // const errorsAfterValidation = validationResult(req);

  // if (!errorsAfterValidation.isEmpty()) {
  //   return res.status(400).json({
  //     code: 400,
  //     errors: errorsAfterValidation.mapped(),
  //   });
  // } 
    
  try {
    // console.log(req.body);  
    const { name, email, password, type } = req.body;
    console.log(typeof type)
    const user = await getUsers(email, type);

    if (!user) {
      await createUser(name, email, password, type);

      // Sign token
      const newUser = await getUsers(email, type);
      const token = jwt.sign(
        { email }, 
        config.passport.secret, 
        { expiresIn: 10000000, }
      );

      const userToReturn = { ...newUser.toJSON(), ...{ token } };
      delete userToReturn.hashedPassword;

      res.status(200).json(userToReturn);
    } 
    
    else {
        generateServerErrorCode(res, 403, 'register email error', USER_EXISTS_ALREADY, 'email');
    }
  } 
    
  catch (e) {
    console.log(e)  
    generateServerErrorCode(res, 500, e, SOME_THING_WENT_WRONG);
  }
});

/**
 * POST/
 * Login a user
 */

userController.post('/login', loginValidation, async (req, res) => {
  // const errorsAfterValidation = validationResult(req);

  // if (!errorsAfterValidation.isEmpty()) {
  //   return res.status(400).json({
  //     code: 400,
  //     errors: errorsAfterValidation.mapped(),
  //   });
  // } 
  
  const { email, password, type } = req.body;

  const user = await getUsers(email, type);
  
  if (user && user.email) {
    const isPasswordMatched = user.comparePassword(password);
    
    if (isPasswordMatched) {
      // Sign token
      const token = jwt.sign(
        { email }, 
        config.passport.secret,         
        { expiresIn: 1000000 }
      );
      
      const userToReturn = { ...user.toJSON(), ...{ token } };
      delete userToReturn.hashedPassword;

      res.status(200).json(userToReturn);
    } 
    
    else {
      generateServerErrorCode(res, 403, 'login password error', WRONG_PASSWORD, 'password');
    }
  } 

  else {
    generateServerErrorCode(res, 404, 'login email error', USER_DOES_NOT_EXIST, 'email');
  }
});

export default userController;