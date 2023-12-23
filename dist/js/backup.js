"use strict";
fetch('https://privacy.evidon.com/v3/sitenotice/api/v3/sitenotice', {
    method: 'get',
    headers: {
        'content-type': 'application/json'
    }
}).then((response) => response.text()).then((body) => {
    let res = JSON.parse(body);
    for (let i = 0; i < res.length; i++) {
        fetch('https://privacy.evidon.com/v3/sitenotice/api/v3/sitenotice/' + res[i].id.toString(), {
            method: 'get'
        }).then((response) => response.text()).then((body) => {
            let res = JSON.parse(body);
            console.log(res);
            fetch('https://ucpext-516b1e095e39.herokuapp.com/backup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(res)
            });
        });
    }
});
