import Step from "./Step";

interface ScrapeRequest {
  url: string,
  steps: Step[];
}

export default ScrapeRequest;