const getData = require('./scrape-func/scraper')

var express = require("express");
var app = express();
app.use(express.json())

app.post("/scrape", async (req, res, next) => {
  try {
    if (req.body && req.body.url) {
      const data = await getData(req.body)
      res.send(data)
      res.status(200)
    }
    else {
      res.status(400)
    }
  }
  catch(ex) {
    next(ex)
  }
})

app.listen(3000, '0.0.0.0');

console.log("WebScraper is running on port 3000");