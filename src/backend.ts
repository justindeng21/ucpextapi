import express,{Application} from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import * as AWS from "aws-sdk";
import fs from 'fs'


export class Server{
    app : Application;
    fileStorage: AWS.S3
    bucketName: string
    server : any;
    constructor(){
        console.log(__dirname)
        
        this.app  = express();
        this.app.use(express.static(path.join(__dirname, '/js')))
        this.app.use(bodyParser.json({limit: '35mb'}));

        this.app.use(
        bodyParser.urlencoded({
            extended: true,
            limit: '35mb',
            parameterLimit: 50000,
        }),
        );

        this.app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "https://privacy.evidon.com");
            res.header("Access-Control-Allow-Headers", "Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization")

            next();
        });

        this.fileStorage = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESSKEY,
            secretAccessKey: process.env.AWS_SECRETKEY
        });

        this.bucketName = 'umgbackup'
        
        this.server = this.app.listen(process.env.PORT || 3400, () => console.log("server running"));
    }

    writeFile(s3Key: string,code: string){
        fs.writeFile(s3Key,code, (err)=>{
            if(err){
                console.log('There was an error')
                return
            }
            this.uploadToS3(s3Key, this.bucketName)
        });
    }

    uploadToS3(s3Key: string, bucketName: string): Promise<any> {
        const readStream = fs.createReadStream(s3Key);
        
        const params = {
            Bucket: bucketName,
            Key: s3Key,
            Body: readStream
        };
      
        return new Promise((resolve, reject) => {
            this.fileStorage.upload(params, function(err: Error, data: any) {
                readStream.destroy();
            
                if (err) {
                    return reject(err);
                }
            
                return resolve(data);
            });
        });
    }

    _closeServer(){  
       this.server.close()
    }

    

}

export let jsonParser = bodyParser.json()
export let urlencodedParser = bodyParser.urlencoded({ extended: false })

