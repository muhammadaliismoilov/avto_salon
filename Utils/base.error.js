
class BaseError extends Error {
  constructor(status, message, errors = '') {
    super(message);
    this.status = status;
    this.message = message;
    this.errors = errors;
  }

  static BadRequest(status, message, errors = '') {
    return new BaseError(status || 400, message, errors);
  }

  static Unauthorized(status, message, errors = '') {
    return new BaseError(status || 401, message, errors);
  }
}

module.exports = BaseError;
