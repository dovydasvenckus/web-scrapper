import axios from 'axios';
import cheerio, { CheerioAPI, Node } from 'cheerio';
import ScrapeRequest from './model/ScrapeRequest'
import ScrapedItem from './model/ScrapedItem';

export default async function getData(request: ScrapeRequest) : Promise<ScrapedItem[]> {
  const response = await axios.get(request.url);
  const result = []

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

function getUrl($: CheerioAPI, elem: Node, urlSelector: string) {
  return urlSelector ? $(elem).find(urlSelector).attr('href') : $(elem).attr('href')
}