import axios from 'axios';
import cheerio, { CheerioAPI, Node } from 'cheerio';
import ScrapeRequest from './model/ScrapeRequest'
import ScrapedItem from './model/ScrapedItem';

export function scrapeData(request: ScrapeRequest, htmlBody: string) : ScrapedItem[] {
  const result = []
  const $ = cheerio.load(htmlBody);

  $(request.itemSelector).each((i, elem) => {
    result[i] = {
      title: $(elem).find(request.itemTitleSelector).text().trim(),
      url: getUrl($, elem, request.itemUrlSelector),
      price: $(elem).find(request.itemPriceSelector).text().trim()
    }
  })
  
  return result;
}

function getUrl($: CheerioAPI, elem: Node, urlSelector: string) {
  return urlSelector ? $(elem).find(urlSelector).attr('href') : $(elem).attr('href')
}

export default async function crawlPage(request: ScrapeRequest) : Promise<ScrapedItem[]> {
   const response = await axios.get(request.url);

   if (response.status === 200) {
     return scrapeData(request, response.data );
   }
   return [];
}