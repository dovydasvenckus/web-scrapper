module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const getData = require('./scraper.js');
    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";
    context.log(await getData('https://en.wikipedia.org/wiki/ZAZ_Zaporozhets'))

    context.res = {
        body: responseMessage
    };
}