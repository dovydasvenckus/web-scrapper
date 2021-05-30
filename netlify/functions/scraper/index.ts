import { Handler } from "@netlify/functions";
import ScrapeRequest from "./model/ScrapeRequest";
import Status from "./model/ScrapeStatus";
import { crawlPage } from './scraping';

const handler: Handler = async function (event) {
  const requestBody: ScrapeRequest = JSON.parse(event.body)
  const url = requestBody && requestBody.url;
  console.log('Crawling:' + url);
  
  if (url) {
    const result = await crawlPage(requestBody);
    
    if (result.status === Status.SUCCESS) {
      return {
          statusCode: 200,
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(result)
      };
    }
    else {
      return {
        statusCode: 400
      }
    }
  }
  else {
      return {
        statusCode: 400
      }
  }
}

export { handler };