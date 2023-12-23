import { Server, jsonParser} from "./backend";
import fs from 'fs'
import {exec} from 'child_process'



let test : Server
test = new Server()

class templateEngine{
    getPage(content: string){
        const style = `<link rel="stylesheet" href="../css/textEditor.css">`
        const head = `<head>${style}</head>`
        const body = `<body>${this.getContainer(content)}<body>`

        const html = `<html>${head}${body}<html>`
        return html
    }

    getContainer(content: string){
        return `<div class="container">${content}</div>`
    }

    getTextEditor(folder: string, fileName: string, data: string){
        const textEditor = `<h1 class="heading">Text Editor</h1><form action="/save/${folder}/${fileName}" name="textEditorForm" method="post" class="textEditorForm"><textarea spellcheck="false" class="textEditor" rows="50"name="code">${data}</textarea><input type="submit" value="Save" class="submitButton"><a class="viewButton" href="/${folder}/${fileName}">View</a></form>` 
        return this.getPage(textEditor)
    }

    
}

let templater = new templateEngine()

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

    try{
        let jsFiles = fs.readdirSync(__dirname+'/js');
        //htmlString+="<h2 class=\"heading\">JavaScript</h2>"
        for(let i = 0; i < jsFiles.length; i++){
            if(jsFiles[i].split('.')[1] !== 'ts')
                htmlString+=`<a href="/editor/js/${jsFiles[i]}">${jsFiles[i]}</a>`
        }
    }catch(error){}

    try{
        let redirectFiles = fs.readdirSync(__dirname+'/redirects');
        //htmlString+="<h2 class=\"heading\">Redirect Scripts</h2>"
        for(let i = 0; i < redirectFiles.length; i++){
            htmlString+=`<a href="editor/redirects/${redirectFiles[i]}">${redirectFiles[i]}</a>`
        }
    }catch(error){}

    try{
        let cssFiles = fs.readdirSync(__dirname+'/css');
        //htmlString+="<h2 class=\"heading\">CSS</h2>"
        for(let i = 0; i < cssFiles.length; i++){
            htmlString+=`<a href="editor/css/${cssFiles[i]}">${cssFiles[i]}</a>`
        }
    }catch(error){}

    try{
        let htmlFiles = fs.readdirSync(__dirname+'/html');
        //htmlString+="<h2 class=\"heading\">HTML</h2>"
        for(let i = 0; i < htmlFiles.length; i++){
            htmlString+=`<a href="editor/html/${htmlFiles[i]}">${htmlFiles[i]}</a>`
        } 
    }catch(error){}
    htmlString+="</div>"
    res.send(htmlString)
    
})





test.app.get('/editor/:folder/:fileName',jsonParser,(req,res)=>{
    let fileName = req.params.fileName
    let folder = req.params.folder

    
    fs.readFile(`${__dirname}/${folder}/${fileName}`, 'utf8', (error, data) => {
       
        res.send(templater.getTextEditor(folder,fileName,data))
    })    
})


test.app.post('/save/:folder/:fileName',jsonParser,(req,res)=>{
    let fileName = req.params.fileName
    let folder = req.params.folder
    let code = req.body.code

    fs.writeFile(`${__dirname}/${folder}/${fileName}`,code, (err)=>{
        if(err){
            console.log('There was an error')
            return
        }
    });
    
    res.sendStatus(204)
})





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





