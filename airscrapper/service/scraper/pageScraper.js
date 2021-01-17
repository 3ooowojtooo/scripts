const scraperObject = {
    url: 'https://www.wego.com/schedules/waw/lon/cheapest-flights-from-warsaw-7936-to-london-4254',
    async scraper(browser){
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}`)
        await page.goto(this.url)
        await page.waitForSelector(".content > section.schedules > div.schedules > div.schedules-direct > div.schedules-table > div.schedules-body > ul")
        return await page.$$eval(".content > section.schedules > div.schedules > div.schedules-direct > div.schedules-table > div.schedules-body > ul", elements => {
            return elements.map(el => {
                const fromCity = el.getAttribute("data-departure-name")
                const fromCountry = el.getAttribute("data-departure-country-name")
                const toCity = el.getAttribute("data-arrival-name")
                const toCountry = el.getAttribute("data-arrival-country-name")
                const arrivalTime = el.getAttribute("data-arrival-time")
                const availability = el.getAttribute("data-availability")
                let departureTime = el.querySelector("li.depart > div").textContent.trim()
                departureTime = departureTime.substring(0, departureTime.indexOf(" "))
                const airline = el.querySelector("li.airline > div > span").textContent
                const durationMinutes = el.querySelector("li.duration").getAttribute("data-sort-value")
                return {
                    "fromCity": fromCity,
                    "fromCountry": fromCountry,
                    "toCity": toCity,
                    "toCountry": toCountry,
                    "arrivalTime": arrivalTime,
                    "availability": availability,
                    "departureTime": departureTime,
                    "airline": airline,
                    "durationMinutes": durationMinutes
                }
            })
        })
    }
}

module.exports = scraperObject