require('dotenv').config();
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) =>{
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>GuideMe Backend Server</title>
      </head>
      <body>
        <h1>
          Welcome to GuideMe Backend Server...
          <br />
          Please use /api/v1/* to access API
          <br />
          For example: /api/v1/user
          <br />
          Thank you!
          <br />
          --GuideMe Team--
        </h1>
        <a href="localhost:3000/api/v1">Back to Home</a>
      </body>
    </html>
  `);
});

module.exports = router;
