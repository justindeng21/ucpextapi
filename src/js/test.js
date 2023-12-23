"use strict";

class CopyHandler{
    constructor(noticeSettings, notices) {
        this.parentNoticeSettings = noticeSettings;
        this.vendors = this.parentNoticeSettings.countries[0].vendors
        this.notices = notices;
        return;
    }

    getVendors(){
       return this.vendors
    }

    logNotices() {
        for (var i in this.notices) {
            console.log(this.notices[i].id);
        }
    }

    copyVendors() {
        for (var i in this.notices) {
            var id = this.notices[i].id
            fetch('https://privacy.evidon.com/v3/sitenotice/api/v3/sitenotice/' + id).then((response) => response.text()).then((body) => {
                var res = JSON.parse(body);
                for(var k in res.countries){
                    res.countries[k].vendors = this.getVendors()
                }
                fetch('https://privacy.evidon.com/v3/sitenotice/api/v3/sitenotice', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(res)
                })
                
            })
        }
    }
}


async function fetchParentNotice(id) {
    return fetch('https://privacy.evidon.com/v3/sitenotice/api/v3/sitenotice/' + id).then((response) => response.text()).then((body) => {
        return JSON.parse(body);
    });
}


async function fetchAllNotices() {
    return fetch('https://privacy.evidon.com/v3/sitenotice/api/v3/sitenotice').then((response) => response.text()).then((body) => {
        return JSON.parse(body);
    });
}


var i = new CopyHandler(await fetchParentNotice(/* Notice ID HERE with the type integer*/),await fetchAllNotices());
i.copyVendors();