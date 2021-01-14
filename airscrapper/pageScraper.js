const scraperObject = {
    url: 'https://www.wego.com/schedules/waw/lon/cheapest-flights-from-warsaw-7936-to-london-4254',
    async scraper(browser){
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}`)
        await page.goto(this.url)
    }
}

module.exports = scraperObject