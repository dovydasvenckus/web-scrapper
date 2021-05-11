exports.handler = async function (event, context) {
  console.log(event.body)
  console.log(event.body.url)
  const url = event.body && event.body.url;
  console.log('Crawling:' + url);
  
  if (url) {
      return {
          body: await getData(event.body)
      };
  }
  else {
      return {
          status: 400
      }
  }
}

async function getData(request) {
  const axios = require('axios');
  const cheerio = require('cheerio');
  const response = await axios.get(request.url);
  let result = []

  if (response.status === 200) {
    const html = response.data;
    const $ = cheerio.load(html);
    
    $(request.itemSelector).each((i, elem) => {
      result[i] = {
        title: $(elem).find(request.itemTitleSelector).text().trim(),
        url: getUrl($, elem, request.itemUrlSelector),
        price: $(elem).find(request.itemPriceSelector).text().trim()
      }
    } )
  }

  return result;
}

function getUrl($, elem, urlSelector) {
  return urlSelector ? $(elem).find(urlSelector).attr('href') : $(elem).attr('href')
}