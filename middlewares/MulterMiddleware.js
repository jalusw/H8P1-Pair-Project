const path = require("path");
const multer = require("multer");
const slugify = require("slugify");

const storage = multer.diskStorage({
  destination: path.resolve(
    path.join(__dirname, "..", "public/uploads"),
  ),
  filename: (_, file, cb) => {
    const name = slugify(file.originalname, { lower: true });
    cb(null, `${new Date().getTime()}-${name}`);
  },
});

module.exports = (config) => multer({ storage, ...config });
