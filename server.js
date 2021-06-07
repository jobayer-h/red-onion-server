const express = require('express')
const app = express()
const port = 4000

app.get('/', (req, res) => {
  res.send('Red Onion Restrurent Server v1.0.0')
})

app.listen(port, () => {
  console.log(`Example app listening at :${port}`)
})