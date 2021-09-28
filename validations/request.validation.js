import {body} from 'express-validator';

export const loginValidationRules = () => {
  return [
    body('email').isEmail(),
    body('password').isLength({min: 5}),
  ];
};

export const registerValidationRules = () => {
  return [
    body('email').isEmail(),
    body('password').isLength({min: 5}),
    body('username').isLength({min: 2}).isString(),
    body('name').isLength({min: 2}).isString(),
  ];
};