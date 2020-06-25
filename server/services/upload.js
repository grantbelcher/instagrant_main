const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require('config');

const secretId = config.get("AccessKeyID");
const accessKey = config.get("SecretAccessKey");

aws.config.update({
  secretAccessKey: accessKey,
  accessKeyId: secretId,
  region: 'us-west-2',
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
  }
}

const upload = multer({
  fileFilter,
  storage: multerS3({
    acl: 'public-read',
    s3,
    bucket: 'instagrant-images',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: 'TESTING_METADATA'});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
});

module.exports = upload;


// const AWS = require('aws-sdk');
// const multer = require('multer');
// const multerS3 = require('multer-s3');
// const config = require('config');

// const secretId = config.get("AccessKeyID");
// const accessKey = config.get("SecretAccessKey");

// const s3 = new AWS.S3();

// AWS.config.update({
//   secretAccessKey: secretId,
//   accessKeyId: accessKey,
//   region: 'us-west-2',
// });


// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: 'instagrant-images',
//     acl: 'public-read',
//     metadata: function (req, file, cb) {
//       cb(null, {fieldName: 'TESTING_META_DATA'});
//     },
//     key: function (req, file, cb) {
//       cb(null, Date.now().toString())
//     }
//   })
// })

// module.exports = upload;
