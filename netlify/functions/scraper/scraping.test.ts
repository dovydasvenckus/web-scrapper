import { scrapeData, crawlPage } from './scraping';
import fs from 'fs';
import Status from './model/ScrapeStatus';

describe('scrapper', () => {
  it('should scrape single field', async () => {
    const request = {url: 'http://some-fake-url/', steps: [{fieldName: 'firstField', selector: '#p123'}]}
    const htmlBody = await fs.promises.readFile('./netlify/functions/scraper/testData/simple.html');

    const result = scrapeData(request, htmlBody.toString());
    
    expect(result.status).toBe(Status.SUCCESS);
    expect(result.data.length).toBe(1);
    expect(result.data[0]).toStrictEqual({"name": "firstField", "value": "First text value"});
  })

  it('should return failure response, when HTML is unretrievable', async () => {
    const request = {url: 'http://some-fake-url/', steps: [{fieldName: 'firstField', selector: '#p123'}]}

    const result = await crawlPage(request);
    expect(result.status).toBe(Status.FAILURE);
  })

  it('should scrape two fields', async () => {
    const request = {
      url: 'http://some-fake-url/',
      steps: [
        {fieldName: 'firstField', selector: '#p123'},
        {fieldName: 'secondField', selector: '#p124'}
      ]
    }
    const htmlBody = await fs.promises.readFile('./netlify/functions/scraper/testData/simple.html');
    
    const result = scrapeData(request, htmlBody.toString());

    expect(result.status).toBe(Status.SUCCESS);
    expect(result.data.length).toBe(2);
    expect(result.data[0]).toStrictEqual({"name": "firstField", "value": "First text value"});
    expect(result.data[1]).toStrictEqual({"name": "secondField", "value": "Second text value"});
  })
})