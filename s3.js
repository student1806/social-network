const aws = require("aws-sdk");
const fs = require("fs");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets.json"); // in dev they are in secrets.json which is listed in .gitignore
}

const s3 = new aws.S3({
    accessKeyId: secrets.awsKey,
    secretAccessKey: secrets.awsSecret
});

module.exports.upload = function(req, res, next) {
    if (!req.file) {
        console.log("no req.file");
        return res.sendStatus(500);
    }
    const { filename, mimetype, size, path } = req.file;

    s3.putObject({
        Bucket: "spicedling",
        ACL: "public-read",
        Key: filename,
        Body: fs.createReadStream(path),
        ContentType: mimetype,
        ContentLength: size
    })
        .promise()
        .then(() => {
            console.log("upload worked");
            next();
            fs.unlink(path, () => {}); // deletets file after it send to amazon
        })
        .catch(err => {
            console.log("Error on the uplaod ", err);
            res.sendStatus(500);
        });
};
