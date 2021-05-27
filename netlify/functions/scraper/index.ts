import { Handler } from "@netlify/functions";
import ScrapeRequest from "./model/ScrapeRequest";
import crawlPage from './scraping';

const handler: Handler = async function (event) {
  const requestBody: ScrapeRequest = JSON.parse(event.body)
  const url = requestBody && requestBody.url;
  console.log('Crawling:' + url);
  
  if (url) {
      return {
          statusCode: 200,
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(await crawlPage(requestBody))
      };
  }
  else {
      return {
        statusCode: 400
      }
  }
}

export { handler };