const { User , Biodata} = require("../models");
class AuthenticationHelper {
  static async user(req) {
    return await User.findByPk(req?.session?.user, {
      include : Biodata
    });
  }
}

module.exports = AuthenticationHelper;
