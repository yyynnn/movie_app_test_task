/* eslint-disable @typescript-eslint/no-var-requires */
var express = require('express')
var app = express()
var fs = require('fs')

app.set('port', 3000)
app.use(express.static(__dirname + '/packages/movie-app/dist'))

app.get('*', function (request, response) {
  response.sendFile(__dirname + '/packages/movie-app/dist/index.html')
})

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'))
})
