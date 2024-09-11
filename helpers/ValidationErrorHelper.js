class ValidationErrorHelper {
  static mapErrorByPath(sequelizeErrors) {
    const result = {};
    sequelizeErrors.forEach((error) => {
      result[error.path] = error;
    });
    return result;
  }
}
module.exports = ValidationErrorHelper;
