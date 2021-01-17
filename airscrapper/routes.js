const express = require("express")
const router = express.Router()
const manageService = require('./service/manage/manageService')

router.put("/manage/connections", async (req, res) => {
    await manageService.renewConnections("Poland", "Warsaw", "United Kingdom", "London")
    res.sendStatus(200)
})

module.exports = router