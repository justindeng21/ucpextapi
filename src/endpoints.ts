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
    res.sendFile('js/createTags.js',{ root: __dirname })
})



test.app.get('/noticeoperations.js',jsonParser,(req,res)=>{
    res.sendFile('js/noticeOperations.js',{ root: __dirname })
})


test.app.post('/backup',jsonParser,(req,res)=>{

    fs.writeFile('subRoutines/'+makeid(20)+'.json', JSON.stringify(req.body), (err)=>{
        if(err){
            console.log('There was an error')
            return
        }
    });
   
    exec('python subRoutines/backup.py', (error, stdout, stderr) => {
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





