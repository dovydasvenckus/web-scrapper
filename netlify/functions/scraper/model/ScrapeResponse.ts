import ScrapedField from "./ScrapedField";
import Status from "./ScrapeStatus";

interface ScrapeResponse {
  status: Status;
  data?: ScrapedField[]; 
}

export default ScrapeResponse;