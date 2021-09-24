import {checkSchema} from 'express-validator';

export const registrationRequest = checkSchema({
  email: {
    isEmail: {
      bail: true,
    },
  },
  password: {
    isLength: {
      errorMessage: 'Password should be at least 6 chars long',
      options: {min: 6},
    },
  },
  username: {
    isString: true,
    isLength: {
      errorMessage: 'Username should be at least 2 chars long',
      options: {min: 2},
    },
  },
});