var express = require('express');
var exphbs  = require('express-handlebars');
var fs = require("fs");
var https = require('https');
var path = require('path')
var reload = require('reload')
var bodyParser = require('body-parser');

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static('public'));
app.get('/update.html', function (req, res) {
   res.sendFile( __dirname + "/" + "update.html" );
})

//Pushing the stats to the page
app.get('/', function (req, res) {
  var j = JSON.parse(fs.readFileSync('stats.json','utf8'));
  var stats = {month: j.month, tickets: j.openTickets, solved: j.ticketsSolved,firstResponse: j.firstResponse,resolution: j.resolution, satisfactionScore: j.satisfactionScore, satResponse: j.satResponse,slaNum: j.slaNum, slaPer: j.slaPer, marquee: j.marquee};
  res.render('home', stats);
  });

app.post('/update.html', urlencodedParser, function (req, res) {
   // Prepare output in JSON format
   response = {
      month:req.body.month,
      openTickets:req.body.openTickets,
      ticketsSolved:req.body.ticketsSolved,
      firstResponse:req.body.firstResponse,
      resolution:req.body.resolution,
      satisfactionScore:req.body.satisfactionScore,
      satResponse:req.body.satResponse,
      slaNum:req.body.slaNum,
      slaPer:req.body.slaPer,
      marquee:req.body.marquee
   };
   console.log(response);
   res.end(JSON.stringify(response));
   fs.writeFileSync('stats.json',JSON.stringify(response));
});

//Running API call functions
app.listen(8081, function(){
  console.log('listen init');
//  getOpenTickets()
  //getSatisfactionScore()
});
