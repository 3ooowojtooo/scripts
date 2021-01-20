const pageScraper = require('./pageScraper')

let browser;

async function setBrowserPromise(browserPromise) {
    try {
        browser = await browserPromise
    } catch (err) {
        console.log("Could not resolve the browser instance: ", err)
    }
}

async function scrapeAll(url) {
    return await pageScraper(browser, url)
}

module.exports = {
    setBrowserPromise, scrapeAll
}