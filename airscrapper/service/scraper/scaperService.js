const pageScraper = require('./pageScraper')

let browser;

async function setBrowserPromise(browserPromise) {
    try {
        browser = await browserPromise
    } catch (err) {
        console.log("Could not resolve the browser instance: ", err)
    }
}

async function scrapeAll(){
    try{
        return await pageScraper.scraper(browser);
    } catch (err) {
        console.log("Could not scrape objects")
        throw err
    }
}

module.exports = {
    setBrowserPromise, scrapeAll
}