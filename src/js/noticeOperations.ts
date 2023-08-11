
console.log('Hi Justin')
class NoticeOperations{

    /*
        Paramerters: noticeId - string
        Returns: Promise
        Algorithm: Makes an HTTP request to the UCP api to fetch a specific notice's settings.
    */
    static getNotice(noticeId: string){
        return fetch('https://privacy.evidon.com/v3/sitenotice/api/v3/sitenotice/'+noticeId,{
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


    static getTemplate(templateId: string){
        return fetch('https://privacy.evidon.com/v3/sitenotice/api/sntemplate/'+templateId,{
            method:'GET',
            headers:{
                'Content-Type': 'application/json'
            }
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




    static copyNotice(newDomain:string,noticeId:string){
        var domainExist = false, noticeExist = false;
        NoticeOperations.getAllDomains().then((response)=>response.text())
        .then((body)=>{
            var notices = JSON.parse(body)
            for(var i in notices){
                if(newDomain === notices[i].domain){ 
                    domainExist = true;
                    console.log(`Invalid Domain. ${newDomain} will not be coppied`)
                }
                if(noticeId === String(notices[i].id)) noticeExist = true;
                
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
                    .then((body)=>{
                        console.log('Request to save notice made')
                        return;
                    })
                }); 
            }
        })
        return;
    }


};




