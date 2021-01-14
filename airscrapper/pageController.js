const pageScraper = require('./pageScraper')
async function scapeAll(browserPromise){
    let browser;
    try{
        browser = await browserPromise;
        await pageScraper.scraper(browser);
        console.log("Success scrapper");
    } catch (err) {
        console.log("Could not resolve the browser instance: ", err)
    }
}

module.exports = (browserPromise) => scapeAll(browserPromise)