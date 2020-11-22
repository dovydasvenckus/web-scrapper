module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const getData = require('./scraper.js');
    const url = req.body && req.body.url;
    context.log('Crawling:' + url);
    
    if (url) {
        context.res = {
            body: await getData(req.body)
        };
    }
    else {
        context.res = {
            status: 400
        }
    }
}