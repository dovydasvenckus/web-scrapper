const getData = require('./scrape-func/scraper')

var express = require("express");
var app = express();
app.use(express.json())

app.listen(3000, () => {
 console.log("WebScraper is running on port 3000");
});

app.post("/scrape", async (req, res, next) => {
  console.log(req.body)
  if (req.body && req.body.url) {
    const data = await getData(req.body.url)
    res.send(data.data)
    res.status(200)
  }
  else {
    res.status(400)
  }
})