const express = require("express")
const router = express.Router()
const connectionService = require('./service/connection/connectionService')

router.put("/connections", async (req, res) => {
    await connectionService.renewConnections("Poland", "Warsaw", "United Kingdom", "London")
    res.sendStatus(200)
})

router.get("/connections", async (req, res) => {
    try {
        const response = await connectionService.getConnections(
            req.query["from"],
            req.query["to"],
            req.query["maxDurationMinutes"],
            req.query['minDepartureTime'],
            req.query['maxDepartureTime'],
            req.query['minArrivalTime'],
            req.query['maxArrivalTime']
        )
        res.json(response)
    } catch (err) {
        res.status(400)
            .send({
                "message": err.message
            })
    }
})

module.exports = router