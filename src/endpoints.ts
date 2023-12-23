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


test.app.get('/',jsonParser,(req,res)=>{
    let style = `<link rel="stylesheet" href="/css/styles.css">`
    let htmlString = `<head>${style}</head><div class="container">`
    let jsFiles = fs.readdirSync(__dirname+'/js');
    let redirectFiles = fs.readdirSync(__dirname+'/redirects');
    let cssFiles = fs.readdirSync(__dirname+'/css');

    for(let i = 0; i < jsFiles.length; i++){
        if(jsFiles[i].split('.')[1] !== 'ts')
            htmlString+=`<a href="/js/${jsFiles[i]}">js/${jsFiles[i]}</a>`
    }

    for(let i = 0; i < redirectFiles.length; i++){
        htmlString+=`<a href="/redirects/${redirectFiles[i]}">redirects/${redirectFiles[i]}</a>`
    }

    for(let i = 0; i < cssFiles.length; i++){
        htmlString+=`<a href="/css/${cssFiles[i]}">css/${cssFiles[i]}</a>`
    }
    
    htmlString+="</div>"
    res.send(htmlString)
    
})



test.app.get('/js/:fileName',jsonParser,(req,res)=>{
    let fileName = req.params.fileName
    res.sendFile('js/'+fileName,{root: __dirname })
})

test.app.get('/redirects/:fileName',jsonParser,(req,res)=>{
    let fileName = req.params.fileName
    res.sendFile('redirects/'+fileName,{root: __dirname })
})

test.app.get('/css/:fileName',jsonParser,(req,res)=>{
    let fileName = req.params.fileName
    res.sendFile('css/'+fileName,{root: __dirname })
})

test.app.post('/backup',jsonParser,(req,res)=>{

    fs.writeFile(`subRoutines/${req.body.id}.json`, JSON.stringify(req.body), (err)=>{
        if(err){
            console.log('There was an error')
            return
        }
    });
   
    exec(`python subRoutines/backup.py ${req.body.id}.json`, (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
        }
        else if (stderr) {
          console.log(`stderr: ${stderr}`);
        }
        else {
          console.log(stdout);
        }
    })
    res.send(204)
})





