import { Server, jsonParser} from "./backend";


let test : Server
test = new Server()









test.app.get('/',jsonParser,(req,res)=>{
    res.sendFile('js/createTags.js',{ root: __dirname })
})



test.app.get('/noticeoperations.js',jsonParser,(req,res)=>{
    res.sendFile('js/noticeOperations.js',{ root: __dirname })
})

