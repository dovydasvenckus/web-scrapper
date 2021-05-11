exports.handler = async function (context, req) {
    console.log('JavaScript HTTP trigger function processed a request.');

    const getData = require('./scraper.js');
    const url = req.body && req.body.url;
    console.log('Crawling:' + url);
    
    if (url) {
        return {
            body: await getData(req.body)
        };
    }
    else {
        return {
            status: 400
        }
    }
}