"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlencodedParser = exports.jsonParser = exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const AWS = __importStar(require("aws-sdk"));
const fs_1 = __importDefault(require("fs"));
class Server {
    constructor() {
        console.log(__dirname);
        this.app = (0, express_1.default)();
        this.app.use(express_1.default.static(path_1.default.join(__dirname, '/js')));
        this.app.use(body_parser_1.default.json({ limit: '35mb' }));
        this.app.use(body_parser_1.default.urlencoded({
            extended: true,
            limit: '35mb',
            parameterLimit: 50000,
        }));
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "https://privacy.evidon.com");
            res.header("Access-Control-Allow-Headers", "Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization");
            next();
        });
        this.fileStorage = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESSKEY,
            secretAccessKey: process.env.AWS_SECRETKEY
        });
        this.bucketName = 'umgbackup';
        this.server = this.app.listen(process.env.PORT || 3400, () => console.log("server running"));
    }
    writeFile(s3Key, code) {
        fs_1.default.writeFile(s3Key, code, (err) => {
            if (err) {
                console.log('There was an error');
                return;
            }
            this.uploadToS3(s3Key, this.bucketName);
        });
    }
    uploadToS3(s3Key, bucketName) {
        const readStream = fs_1.default.createReadStream(s3Key);
        const params = {
            Bucket: bucketName,
            Key: s3Key,
            Body: readStream
        };
        return new Promise((resolve, reject) => {
            this.fileStorage.upload(params, function (err, data) {
                readStream.destroy();
                if (err) {
                    return reject(err);
                }
                return resolve(data);
            });
        });
    }
    _closeServer() {
        this.server.close();
    }
}
exports.Server = Server;
exports.jsonParser = body_parser_1.default.json();
exports.urlencodedParser = body_parser_1.default.urlencoded({ extended: false });
