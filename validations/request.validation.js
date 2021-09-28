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
    body('password').custom(password => {
      const isValidPassword = password.match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/);

      if (!isValidPassword) {
        throw new Error('Invalid value');
      }

      return true;
    }),
    body('username').isLength({min: 2}).isString(),
    body('name').isLength({min: 2}).isString(),
  ];
};