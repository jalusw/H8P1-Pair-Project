class ValidationErrorHelper {
  static mapErrorByPath(sequelizeErrors) {
    const result = {};
    sequelizeErrors.forEach((error) => {
      result[error.path] = error;
    });
    return result;
  }

  static firstError(sequelizeErrors) {
    return sequelizeErrors.shift();
  }
}
module.exports = ValidationErrorHelper;
