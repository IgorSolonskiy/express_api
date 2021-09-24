import {checkSchema} from 'express-validator';

export const loginRequest = checkSchema({
  email: {
    isEmail: {
      bail: true,
    },
  },
  password: {
    isLength: {
      errorMessage: 'Password should be at least 7 chars long',
      options: {min: 7},
    },
  },
});