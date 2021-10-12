export class ApiError extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static unauthorizedError = () => {
    throw new ApiError(401, 'User is not logged in');
  };

  static unprocessableError = (message) => {
    throw new ApiError(422, message);
  };

  static validationError = (message, errors = []) => {
    throw new ApiError(422, message, errors);
  };
}