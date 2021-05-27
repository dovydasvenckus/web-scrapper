import { scrapeData } from './scraping';
import fs from 'fs';
import Status from './model/ScrapeStatus';

describe('scrapper', () => {
  it('should scrape single field', async () => {
    const request = {url: 'http://some-fake-url/', itemSelector: '#p123'}
    const htmlBody = await fs.promises.readFile('./netlify/functions/scraper/simple.html');

    const result = scrapeData(request, htmlBody.toString());
    
    expect(result.status).toBe(Status.SUCCESS);
    expect(result.value).toBe("Simple text value");
  })
})