exports.handler = async function (event, context) {
  const getData = require('./scraper.js');
  const requestBody = JSON.parse(event.body)
  const url = requestBody && requestBody.url;
  console.log('Crawling:' + url);
  
  if (url) {
      return {
          statusCode: 200,
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(await getData(requestBody))
      };
  }
  else {
      return {
        statusCode: 400
      }
  }
}
