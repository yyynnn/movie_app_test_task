/* eslint-disable @typescript-eslint/no-var-requires */
import axios from 'axios'
import express from 'express'
import fs from 'fs'

const app = express()
const delay = 6 * 60 * 1000 // ms
let count = 1

const someRequest = async () => {
  await axios
    .get('https://heqs-services-dev.onrender.com/api/tickets/')
    .then((response) => {
      setTimeout(() => {
        someRequest()
        count = count + 1
      }, delay)
    })
    .catch((error) => {
      setTimeout(() => {
        someRequest()
        count = count + 1
      }, delay)
    })
}

// express

app.set('port', 3000)

app.get('*', function (request, response) {
  response.sendFile(__dirname + '/packages/heqs-ui-app/dist/index.html')
})

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'))
})

// other stuff
someRequest()
