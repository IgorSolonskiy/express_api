const unauthorizedError = () => {
  throw {status: 401, message: 'User is not logged in'};
};

const unprocessableError = (message) => {
  throw {status: 422, message};
};

const badRequest = (message, errors = []) => {
  throw {status: 400, message, errors};
};

export default {
  unauthorizedError,
  unprocessableError,
  badRequest,
};