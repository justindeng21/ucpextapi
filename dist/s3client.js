"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3Client = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
// Set the AWS Region.
const REGION = "us-east-2"; //e.g. "us-east-1"
// Create an Amazon S3 service client object.
const s3Client = new client_s3_1.S3Client({ region: REGION,
    credentials: {
        accessKeyId: 'configuration.aws.accessKeyId',
        secretAccessKey: ''
    }
});
exports.s3Client = s3Client;
