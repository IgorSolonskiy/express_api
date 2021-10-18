import mongoose from 'mongoose';
import {ApiError} from '../exceptions/api';

export const error = (err, req, res, next) => {
  if (err instanceof ApiError) {
    const error = err.errors.length
        ? {message: err.message, errors: err.errors}
        : {message: err.message};

    return res.status(err.status).json(error);
  }

  if (err instanceof mongoose.Error.ValidationError)
    return res.status(422).json(err.message);

  return res.status(500).json('Internal Server Error');
};