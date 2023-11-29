

fetch('https://privacy.evidon.com/v3/sitenotice/api/v3/sitenotice',{
    method:'get',
    headers:{
        'content-type':'application/json'
    }
}).then((response)=> response.text()).then((body)=>{
    var res = JSON.parse(body)
    for(i in res){
        console.log(res[i].id)
    }
})




function fetchJsonFiles(payloads){

  for(i in payloads){
    fetch('https://privacy.evidon.com/report/api/report/consent/user/overview', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(payloads[i])
    }).then((response) => response.text()).then((body)=>{
      var res = JSON.parse(body)
      console.log(res)
      fetch('https://ucpext-516b1e095e39.herokuapp.com/backup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(res)
      });
    })
  }
}

 