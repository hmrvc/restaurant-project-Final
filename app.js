const express = require('express')
const app = express()

const port = 3000

app.get('/', (req, res) => {
  res.send('web built with express')
})

app.listen(port, () => {
  console.log('connect')
})