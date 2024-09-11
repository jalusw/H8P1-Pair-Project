const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(8);

class HashHelper {
  static generate(plaintext) {
    return bcrypt.hashSync(plaintext, salt);
  }
  static verify(plaintext, hashed) {
    return bcrypt.compareSync(plaintext, hashed);
  }
}

module.exports = HashHelper;
