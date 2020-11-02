const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
app.use(cors());

const port = 8000;
 
app.get('/products', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
});
 
app.listen(port, function () {
  console.log(`CORS-enabled web server listening on port ${port}`)
});