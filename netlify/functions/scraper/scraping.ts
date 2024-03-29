import axios from 'axios';
import cheerio, { CheerioAPI } from 'cheerio';
import ScrapedField from './model/ScrapedField';
import ScrapeRequest from './model/ScrapeRequest'
import ScrapeResponse from './model/ScrapeResponse';
import Status from './model/ScrapeStatus';
import Step from './model/Step';
import StepType from "./model/StepType";

const scrapeText = (step: Step, $: CheerioAPI) :ScrapedField => {
  return {
    name: step.fieldName,
    value: $(step.selector).text().trim() || null
  }
}

const parseStep = (step: Step, $: CheerioAPI) : ScrapedField => {
  switch (step.type) {
    case StepType.SCRAPE_ATTRIBUTE: {
      return {
        name: step.fieldName,
        value: $(step.selector).attr(step.attributeName)?.trim() || null
      } 
    }
    case StepType.SCRAPE_TEXT:
      return scrapeText(step, $);
    default:
      return scrapeText(step, $);
    } 
}

export function scrapeData(request: ScrapeRequest, htmlBody: string) : ScrapeResponse {
  const $ = cheerio.load(htmlBody);
  const { steps } = request;

  return {
    status: Status.SUCCESS,
    data: steps.map(step => parseStep(step, $))
  };
}

export async function crawlPage(request: ScrapeRequest) : Promise<ScrapeResponse> {
  try {
    const response = await axios.get(request.url);
    if (response.status === 200) {
      return scrapeData(request, response.data);
    }
    return {status: Status.FAILURE};
  }
  catch(e) {
    return {status: Status.FAILURE};
  }
}