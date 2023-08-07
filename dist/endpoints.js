"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const backend_1 = require("./backend");
let test;
test = new backend_1.Server();
const backend_2 = require("./backend");
class NoticeOperations {
    static getNotice(username, password, noticeId) {
        return fetch('https://privacyapi.evidon.com/api/v3/sitenotice/' + noticeId, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${btoa(username + ':' + password)}`,
                'Content-Type': 'application/json'
            }
        });
    }
    static saveNotice(username, password, payload) {
        return fetch('https://privacyapi.evidon.com/api/v3/sitenotice/', {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${btoa(username + ':' + password)}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
    }
    static getAllDomains(username, password) {
        return fetch('https://privacyapi.evidon.com/api/v3/sitenotice/', {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${btoa(username + ':' + password)}`,
                'Content-Type': 'application/json'
            }
        });
    }
}
function copyNotice(username, password, newDomain, noticeId) {
    var domainExist = false;
    var noticeExist = false;
    NoticeOperations.getAllDomains(username, password).then((response) => response.text()).then((body) => {
        var notices = JSON.parse(body);
        for (var i in notices) {
            if (newDomain === notices[i].domain) {
                domainExist = true;
            }
            if (noticeId === notices[i].id) {
                noticeExist = true;
            }
        }
    })
        .then(() => {
        if (domainExist === false && noticeExist === true) {
            NoticeOperations.getNotice(username, password, noticeId).then((response) => response.text())
                .then((body) => {
                var noticeSettings = JSON.parse(body);
                noticeSettings.domain = newDomain;
                noticeSettings.id = 0;
                NoticeOperations.saveNotice(username, password, noticeSettings).then((body) => {
                    return;
                });
            });
        }
    });
    return;
}
test.app.get('/', (req, res) => {
    res.send('hi');
});
test.app.post('/copyNotice', backend_2.jsonParser, (req, res) => {
    if (req.body.username === undefined || req.body.password === undefined || req.body.noticeId === undefined || req.body.newDomain === undefined) {
        res.sendStatus(500);
        res.end();
        return;
    }
    else {
        var username = req.body.username;
        var password = req.body.password;
        var noticeId = req.body.noticeId;
        var newDomain = req.body.newDomain;
        copyNotice(username, password, newDomain, noticeId);
        res.sendStatus(200);
    }
});
