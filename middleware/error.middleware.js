import mongoose from 'mongoose';

export const errorMiddleware = (err, req, res, next) => {
  if (err.status) {
    return res.status(err.status).json({message:err.message, errors: err.errors});
  }

  if(err instanceof mongoose.Error.ValidationError)
    return res.status(422).json(err.message);

  return res.status(500).json('Internal Server Error');
};