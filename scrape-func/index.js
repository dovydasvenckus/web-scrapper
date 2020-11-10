module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const getData = require('./scraper.js');
    const url = req.body && req.body.name;
    if (url) {
        context.res = {
            body: getData(url)
        };
        return;
    }
    context.res = {
        status: 400
    }
}