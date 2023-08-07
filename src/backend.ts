import express,{Application} from 'express';
import bodyParser from 'body-parser';



export class Server{
    app : Application;

    
    server : any;
    constructor(){
        
        this.app  = express();

        this.app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
            //res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
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

