const express = require('express');
const request = require('request');
const router = express.Router();
const app = express()
const port = 8000

app.get('/', function(req, res, next){
  res.send("Landing page")
});

app.get('/invoice', function(req, res, next){
  var data = {
    template: {name: 'invoice-main'},
    data: {
      number: "12312",
      seller: {
          name: "Yuvod",
          road: "12345 Sunny Road",
          country: "Sunnyville, TX 12345"
      },
      buyer: {
          name: "Acme Corp.",
          road: "16 Johnson Road",
          country: "Paris, France 8060"
      },
      items: [{
          name: "Website design",
          price: 300
      },
      {
          name: "Another one",
          price: 100
      }]
    },
    options: { reports: { save: true } }
  }
  var payload = {
    url: 'http://localhost:5488/api/report', 
    method: 'POST',
    json: data
  }
  request(payload).on('response', function(response) {
    console.log(response.statusCode)
    console.log(response.headers['content-type'])
    console.log(response.headers['report-blobname']) // This can be used to build a Cache.
  }).pipe(res);
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))