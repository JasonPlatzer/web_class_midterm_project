const money = document.querySelector('#money')
const moneyType = document.querySelector('#money-type')
const canvas = document.querySelector('#line-chart')
const context = canvas.getContext('2d')


moneyType.addEventListener('change', function(){
   
const url = "https://api.coindesk.com/v1/bpi/currentprice.json"


// from https://www.codegrepper.com/code-examples/javascript/get+promise+result+from+json%28%29+javascript
// gets data from first url then checks to see what the value of the event listener is and displays price of bitcoin from api
// the api only has these three currency values
fetch(url).then((response) => response.json())
   .then(data=>{
       // gets data from api based on what event listener value is
       if (this.value == 'EUR'){
           //displaying price on page
          money.innerHTML = data.bpi.EUR.rate
       }else if (this.value == 'GBP'){
       money.innerHTML = data.bpi.GBP.rate
       }else if (this.value == 'USD'){
          money.innerHTML = data.bpi.USD.rate
       }else{
          money.innerHTML = ''
       }
       }).catch((err) =>{
        console.log('!Error ', err)
      })
})

  
 //from https://stackoverflow.com/questions/44132904/javascript-get-date-30-days-ago  
// a new date to use for the api call
let priorDate = new Date()
// a second date to use to adjust for the first date
let yesterday = new Date()
// gets a date minus 30 days  from creation of second date and sets first date to that day
priorDate.setDate(yesterday.getDate()- 30)
// gets the year and the month of date
let beforeYear = priorDate.getFullYear()
let beforeMonth = priorDate.getMonth()
// the api call needs a number to have a zero in front of a number for month and day if less than 10
// this gets a new number to use if month is less than 10 using a string template
if (beforeMonth <10){
    beforeMonth = `0${beforeMonth}`
}
// same thing for day of the month
let beforeDay = priorDate.getDate()
if (beforeDay<10){
    beforeDay = `0${beforeDay}`
}

// making another date for api call using same method as before but setting date to one day before day its created
let date = new Date()
let blankDate = new Date()
date.setDate(blankDate.getDate()-1)
let year = date.getFullYear()
let month = date.getMonth()
if (month<10){
    month = `0${month}`
}
let day = date.getDate()
if  (day < 10){
    day = `0${day}`
}



let listKeys = []
let listValues = []

// the format the api call needs to be in
//let urlTwo = ' https://api.coindesk.com/v1/bpi/historical/close.json?start=2021-02-01&end=2021-03-05 '
// the second api call using dates created before
let urlTwo =  `https://api.coindesk.com/v1/bpi/historical/close.json?start=${beforeYear}-${beforeMonth}-${beforeDay}&end=${year}-${month}-${day}`
fetch(urlTwo).then((response) => response.json())
.then(data =>{
    //from https://stackoverflow.com/questions/10654992/how-can-i-get-a-collection-of-keys-in-a-javascript-dictionary
    // populates empty lists with lists of dates and prices of bitcoin
    listKeys = Object.keys(data.bpi)
    listValues = Object.values(data.bpi)

   //from https://www.chartjs.org/docs/latest/getting-started/
   // creating a line chart
   var ctx = document.getElementById('line-chart').getContext('2d');
   var chart = new Chart(ctx, {
   type: 'line',
   data: {
       labels: [],
       datasets: [{
           label: 'Bitcoin',
           backgroundColor: '#180943',
           borderColor: '#180943',
           //from https://stackoverflow.com/questions/38222345/chartjs-line-charts-remove-color-underneath-lines
           // removes fill so chart is just of a line, to look better
           fill: false,
           data: []
       }]
   },
   options: {
       //from https://stackoverflow.com/questions/38512001/charts-js-graph-not-scaling-to-canvas-size
       // makes it so I can set the size of the chart otherwise chart is too big on page
       responsive:false,
       scales:{
           yAxes:[{
               ticks:{
                   // making sure chart numbers don't start at 0
                   beginAtZero: false
               }
           }]
       
       }
   }
   
   });

       // a for loop to populate chart with data points of dates and prices of bitcoin from lists
       for (let x = 0;x<listKeys.length;x++){
       chart.data.labels.push(listKeys[x])
       chart.data.datasets[0].data.push(listValues[x])
       chart.update()
        }
    
}).catch((err) =>{
    console.log('!Error ', err)
  })



 