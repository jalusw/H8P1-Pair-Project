class ErrorPageHelper {
  static internalServerError(error, res) {
    return res.status(500).render("error", {
      error: {
        status: "500 Internal Server Error",
        stack: error ?? "",
      },
      message: "Oops! Something went wrong on our end. Please try again later",
    });
  }
}

module.exports = ErrorPageHelper;
