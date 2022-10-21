/* eslint-disable @typescript-eslint/no-var-requires */
var express = require('express')
var app = express()
var fs = require('fs')

app.set('port', 3000)
app.use(express.static(__dirname + '/packages/heqs-ui-app/dist'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs')
app.set('views', __dirname + '/packages/heqs-ui-app/dist')

app.get('/', function (request, response) {
  response.render('index.html')
})

app.listen(app.get('port'), function () {
  if (process.env.DYNO) {
    console.log('This is on Heroku..!!')
    fs.openSync('/tmp/app-initialized', 'w')
  }
  console.log('Node app is running on port', app.get('port'))
})
