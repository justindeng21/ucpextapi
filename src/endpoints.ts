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

test.app.post('/',jsonParser,(req,res)=>{
    fs.writeFile('data/'+makeid(20)+'.json', JSON.stringify(req.body), (err)=>{
        if(err){
            console.log('There was an error')
            return
        }
    });
    res.end()
})

test.app.post('/xss',jsonParser,(req,res)=>{
    fs.writeFile('data/'+makeid(20)+'.json', JSON.stringify(req.body), (err)=>{
        if(err){
            console.log('There was an error')
            return
        }
    });
    exec('python pythonSubRoutines/xss.py', (error, stdout, stderr) => {
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
    res.send('ok')
})



test.app.get('/childprocess2',jsonParser,(req,res)=>{
    exec('python pythonSubRoutines/aggregateData2.py', (error, stdout, stderr) => {
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
    res.send('hello')
})

test.app.get('/childprocess',(req,res)=>{
    exec('python pythonSubRoutines/aggregateData.py', (error, stdout, stderr) => {
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
    res.send('hello')
})

