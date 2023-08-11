

console.log('Hi Justin')
class NoticeOperations{

    /*
        Paramerters: noticeId - string
        Returns: Promise
        Algorithm: Makes an HTTP request to the UCP api to fetch a specific notice's settings.
    */
    static getNotice(noticeId: number){
        return fetch('https://privacy.evidon.com/v3/sitenotice/api/v3/sitenotice/'+ String(noticeId),{
            method:'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        })
    }

    /*
        Paramerters: payload - object
        Returns: Promise
        Algorithm: Makes an HTTP request to the UCP api to save a notice given a payload
    */
    static saveNotice(payload: object){
        return fetch('https://privacy.evidon.com/v3/sitenotice/api/v3/sitenotice',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
    }


    /*
        Paramerters: none
        Returns: Promise
        Logic: Makes an HTTP request to the UCP api to save a notice given a payloas
    */
    static getAllDomains(){
        return fetch('https://privacy.evidon.com/v3/sitenotice/api/v3/sitenotice/',{
                method:'GET',
                headers:{
                    'Content-Type': 'application/json'
                }
            })
    }


    static copyNotice(newDomain:string,noticeId:number){
        var domainExist = false, noticeExist = false;
        NoticeOperations.getAllDomains().then((response)=>response.text())
        .then((body)=>{
            var notices = JSON.parse(body)
            for(var i in notices){
                if(newDomain === notices[i].domain){ 
                    domainExist = true;
                    console.log(`Invalid Domain. ${newDomain} will not be coppied`)
                }
                if(noticeId === notices[i].id) noticeExist = true;
                
            }
            if(noticeExist === false) console.log(`Invalid notice ID. ${newDomain} will not be coppied`)
            
        })
        .then(()=>{
            
            if (domainExist === false && noticeExist === true){
                NoticeOperations.getNotice(noticeId).then((response) => response.text())
                .then((body) => {
                    console.log('Notice settings fetched')
                    var noticeSettings = JSON.parse(body);
                    noticeSettings.domain = newDomain;
                    noticeSettings.id = 0;
                    NoticeOperations.saveNotice(noticeSettings)
                    .then(()=>{
                        console.log('Request to save notice made')
                        return;
                    })
                }); 
            }
        })
        return;
    }


};

class TemplateOperations{
    static getTemplate(templateId: number){
        return fetch('https://privacy.evidon.com/v3/sitenotice/api/sntemplate/'+ String(templateId),{
            method:'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        })
    }

    static saveTemplate(payload: object){
        return fetch('https://privacy.evidon.com/v3/sitenotice/api/sntemplate/',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
    }

    static getAllTemplates(){
        return fetch('https://privacy.evidon.com/v3/sitenotice/api/sntemplate',{
            method:'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        })
    }


    static copyTemplate(templateId: number){
        var templateExist = false;

        TemplateOperations.getAllTemplates().then((response)=>response.text())
        .then((body)=>{
            var templates = JSON.parse(body)
            for(var i in templates){
                if(templateId === templates[i].id)
                    templateExist = true;
            }
            if(templateExist === false) console.log(`Invalid Template ID. ${templateId} will not be coppied`)
        })
        .then(()=>{
            if(templateExist === true){
                TemplateOperations.getTemplate(templateId).then((response) => response.text())
                .then((body) => {
                    console.log('Template settings fetched')
                    var templateSettings = JSON.parse(body);
                    templateSettings.name = 'copy'+ templateSettings.name
                    templateSettings.id = 0  
                    TemplateOperations.saveTemplate(templateSettings)
                    .then(()=>{
                        console.log('Request to save template made')
                        return;
                    })
                }); 
            }
            
        })
    }
}



