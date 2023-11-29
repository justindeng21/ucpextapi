import express,{Application} from 'express';
import bodyParser from 'body-parser';
import path from 'path';


export class Server{
    app : Application;

    
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
        
        this.server = this.app.listen(process.env.PORT || 3400, () => console.log("server running"));
    }

    _closeServer(){  
       this.server.close()
    }

    

}



export var jsonParser = bodyParser.json()
export var urlencodedParser = bodyParser.urlencoded({ extended: false })

