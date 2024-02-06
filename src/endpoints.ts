import { Server, jsonParser} from "./backend";
import fs from 'fs'
import {exec} from 'child_process'



let test : Server
test = new Server()


function makeid(length:number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

test.app.get('/js/:fileName',jsonParser,(req,res)=>{
    let fileName = req.params.fileName
    res.sendFile('js/'+fileName,{root: __dirname })
})

test.app.get('/html/:fileName',jsonParser,(req,res)=>{
    let fileName = req.params.fileName
    res.sendFile('html/'+fileName,{root: __dirname })
})

test.app.get('/redirects/:fileName',jsonParser,(req,res)=>{
    let fileName = req.params.fileName
    res.sendFile('redirects/'+fileName,{root: __dirname })
})

test.app.get('/css/:fileName',jsonParser,(req,res)=>{
    let fileName = req.params.fileName
    res.sendFile('css/'+fileName,{root: __dirname })
})

test.app.get('/home',jsonParser,(req,res)=>{

    res.sendFile('html/texteditor.html',{root: __dirname })
})






test.app.post('/backup',jsonParser,(req,res)=>{
   
    test.writeFile(`${req.body.id}.json`,JSON.stringify(req.body))
    res.sendStatus(204)
})





