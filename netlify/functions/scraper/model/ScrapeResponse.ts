import Status from "./ScrapeStatus";

interface ScrapeResponse {
  status: Status;
  value?: string;
}

export default ScrapeResponse;