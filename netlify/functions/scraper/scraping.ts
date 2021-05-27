import axios from 'axios';
import cheerio from 'cheerio';
import ScrapeRequest from './model/ScrapeRequest'
import ScrapeResponse from './model/ScrapeResponse';
import Status from './model/ScrapeStatus';

export function scrapeData(request: ScrapeRequest, htmlBody: string) : ScrapeResponse {
  const $ = cheerio.load(htmlBody);
  
  return {
    status: Status.SUCCESS,
    value: $(request.itemSelector).text().trim()
  };
}

export default async function crawlPage(request: ScrapeRequest) : Promise<ScrapeResponse> {
   const response = await axios.get(request.url);

   if (response.status === 200) {
     return scrapeData(request, response.data);
   }
   return {status: Status.FAILURE};
}