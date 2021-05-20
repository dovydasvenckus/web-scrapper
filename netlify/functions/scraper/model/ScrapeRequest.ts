interface ScrapeRequest {
  url: string,
  itemSelector: string,
  itemUrlSelector: string,
  itemTitleSelector: string,
  itemPriceSelector: string
}

export default ScrapeRequest;