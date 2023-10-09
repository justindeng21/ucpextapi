var startTime = 1693785600000;
var endTime = 1696464000000;
var noticeId =15249
var payloads = []

var nortAmerica = {
  "start": startTime,
  "end":endTime,
  "noticeIds": [
    noticeId
  ],
  "countryIds": [
    6252001,
    6251999,
    3424932,
    3570311
  ]
}
payloads.push(nortAmerica)

var europe = {
  "start": startTime,
  "end":endTime,
  "noticeIds": [
    noticeId
  ],
  "countryIds": [
    2921044,
    2510769,
    3017382,
    2635167,
    3175395,
    2750405,
    2623032,
    2963597,
    798544,
    2782113,
    2802361,
    2661886,
    3057568,
    719819,
    660013,
    2264397,
    3077311,
    2960313,
    390903,
    732800,
    798549,
    453733,
    458258,
    597427,
    3190538,
    2562770,
    146669,
    3202326,
    3042225,
    3042142,
    2411586,
    630336
  ]
}
payloads.push(europe)

var asiaPacific = {
  "start": startTime,
  "end":endTime,
  "noticeIds": [
    noticeId
  ],
  "countryIds": [
    1814991,
    1668284,
    1835841,
    1861060,
    2077456,
    2186224,
    1643084,
    1733045,
    1605651,
    1269750,
    1880251,
    1819730,
    1562822,
    174982,
    1694008,
    1655842,
    1831722,
    1282988,
    1227603,
    1327865,
    1820814
  ]
}
payloads.push(asiaPacific)

var middleEast = {
  "start": startTime,
  "end":endTime,
  "noticeIds": [
    noticeId
  ],
  "countryIds": [
    294640,
    298795,
    357994,
    102358,
    2215636,
    290557
  ]
}
payloads.push(middleEast)

var centralAmerica = {
  "start": startTime,
  "end":endTime,
  "noticeIds": [
    noticeId
  ],
  "countryIds": [
    3996063,
    3582678,
    3624060,
    3585968,
    3595528,
    3608932,
    3617476,
    3703430
  ]
}
payloads.push(centralAmerica)

var europeNonEu = {
  "start": startTime,
  "end":endTime,
  "noticeIds": [
    noticeId
  ],
  "countryIds": [
    2017370,
    3144096,
    2658434,
    2629691,
    718075,
    6290252,
    690791,
    783754,
    3277605,
    617790,
    614540,
    3042058
  ]
}
payloads.push(europeNonEu)

var southAmerica = {
  "start": startTime,
  "end":endTime,
  "noticeIds": [
    noticeId
  ],
  "countryIds": [
    3469034,
    3865483,
    3923057,
    3895114,
    3686110,
    3658394,
    3378535,
    3437598,
    3932488,
    3382998,
    3439705,
    3625428,
    3381670
  ]
}
payloads.push(southAmerica)

var africa = {
  "start": startTime,
  "end":endTime,
  "noticeIds": [
    noticeId
  ],
  "countryIds": [
    953987,
    2589581,
    2328926,
    2260494,
    203312,
    2400553,
    2542007,
    2245662,
    2464461,
    934292
  ]
}
payloads.push(africa)

var caribbean = {
  "start": startTime,
  "end":endTime,
  "noticeIds": [
    noticeId
  ],
  "countryIds": [
    3573511,
    3576396,
    3577279,
    3572887,
    3374084,
    3573345,
    3577718,
    3580718,
    3575830,
    3508796,
    3580239,
    3723988,
    3489940,
    8505032,
    4566966,
    3575174,
    3576468,
    3577815,
    3573591,
    3576916,
    4796775,
    3579143,
    3578476,
    3578421
  ]
}
payloads.push(caribbean)

var otherEu = {
  "start": startTime,
  "end":endTime,
  "noticeIds": [
    noticeId
  ],
  "countryIds": [
    935317,
    3042362,
    4030656,
    4034749,
    1024031
  ]
}
payloads.push(otherEu)



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
      fetch('https://ucpext-516b1e095e39.herokuapp.com/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(res)
      });
    })
  }
}


fetchJsonFiles(payloads)

setTimeout(()=>{
    fetch('https://ucpext-516b1e095e39.herokuapp.com/childprocess',{
        method: 'GET',
    });
},10000)
