const express = require("express")
const mongoose = require("mongoose")
const routes = require("./routes")
const browser = require("./service/scraper/browser")
const scraperController = require('./service/scraper/scaperService');

const connectionMapper = require('./mapper/connectionMapper')

const DB_URL = "mongodb://127.0.0.1:27017"

mongoose.connect(DB_URL, {useNewUrlParser : true, useUnifiedTopology : true})
.then(() => {
    const app = express()
    app.use(express.json())
    app.use("/api", routes)
    app.listen(5000, async () => {
        let browserPromise = browser.startBrowser();
        await scraperController.setBrowserPromise(browserPromise)
        console.log("Running")
        // let t = await scraperController.scrapeAll()
        // console.log(connectionMapper(t))
    })
})