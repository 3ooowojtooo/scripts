const Connection = require('../../model/Connection')
const Update = require('../../model/Update')
const scraper = require('../scraper/scaperService')
const connectionsMapper = require('../../mapper/connectionMapper')

async function renewConnections(fromCountry, fromCity, toCountry, toCity) {
    await Connection.deleteMany({fromCountry: fromCountry, fromCity: fromCity, toCountry: toCountry, toCity: toCity}).exec()
    console.log("Connections deleted")
    const flights = connectionsMapper(await scraper.scrapeAll())
    console.log("Flights scraped")
    await Connection.create(flights)
    console.log("FLights saved")
    await Update.deleteOne({fromCountry: fromCountry, fromCity: fromCity, toCountry: toCountry, toCity: toCity}).exec()
    console.log("Update deleted")
    const update = new Update({
        fromCity: fromCity,
        fromCountry: fromCountry,
        toCity: toCity,
        toCountry: toCountry,
        lastUpdate: Date.now()
    })
    await update.save()
    console.log("Update saved")
}

module.exports = {renewConnections}