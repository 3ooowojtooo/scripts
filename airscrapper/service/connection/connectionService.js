const Connection = require('../../model/Connection')
const Update = require('../../model/Update')
const scraper = require('../scraper/scaperService')
const connectionsMapper = require('../../mapper/connectionMapper')
const timeUtils = require('../../utils/timeUtils')

const DATA_TTL_MILLISECONDS = 60 * 60 * 1000 // 1 hour

async function renewConnections(fromCountry, fromCity, toCountry, toCity) {
    await Connection.deleteMany({
        fromCountry: fromCountry,
        fromCity: fromCity,
        toCountry: toCountry,
        toCity: toCity
    }).exec()
    console.log("Connections deleted")
    const flights = connectionsMapper.mapToConnections(await scraper.scrapeAll())
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

async function searchFromTo(from, to) {
    return {
        fromCity: "Warsaw",
        fromCountry: "Poland",
        toCity: "London",
        toCountry: "United Kingdom"
    }
}

async function getConnections(from, to, maxDurationMinutes, minDepartureTime, maxDepartureTime, minArrivalTime, maxArrivalTime) {
    validateParams(from, to, maxDurationMinutes, minDepartureTime, maxDepartureTime, minArrivalTime, maxArrivalTime)
    const fromToData = await searchFromTo(from, to)
    const update = await Update.findOne(fromToData).exec()
    if (update === null || (Date.now() - update.lastUpdate) > DATA_TTL_MILLISECONDS) {
        console.log("Updating connections")
        await renewConnections(fromToData.fromCountry, fromToData.fromCity, fromToData.toCountry, fromToData.toCity)
        console.log("Connections updated")
    }
    const filters = buildFilters(fromToData, maxDurationMinutes, minDepartureTime, maxDepartureTime, minArrivalTime, maxArrivalTime)
    return connectionsMapper.mapToResponse(await Connection.find(filters).exec())
}

function validateParams(from, to, maxDurationMinutes, minDepartureTime, maxDepartureTime, minArrivalTime, maxArrivalTime) {
    if (from === undefined) {
        throw new Error("from must be specified")
    }
    if (to === undefined) {
        throw new Error("to must be specified")
    }
    if (maxDurationMinutes !== undefined) {
        if (isNaN(parseInt(maxDurationMinutes))) {
            throw new Error("maxDurationMinutes must be a number")
        }
    }
    validateTimeString(minDepartureTime, "minDepartureTime")
    validateTimeString(maxDepartureTime, "maxDepartureTime")
    validateTimeString(minArrivalTime, "minArrivalTime")
    validateTimeString(maxArrivalTime, "maxArrivalTime")
}

function validateTimeString(timeString, propertyName) {
    if (timeString === undefined) {
        return
    }
    const hour = timeString.substr(0, 2)
    const minute = timeString.substr(3, 2)
    let hourValue, minuteValue;
    if (hour.startsWith("0")) {
        hourValue = parseInt(hour.charAt(1))
    } else {
        hourValue = parseInt(hour)
    }
    if (minute.startsWith("0")) {
        minuteValue = parseInt(minute.charAt(1))
    } else {
        minuteValue = parseInt(minute)
    }
    if (isNaN(hourValue) || isNaN(minuteValue) || hourValue < 0 || hourValue > 23 || minuteValue < 0 || minuteValue > 59) {
        throw new Error(propertyName + " is invalid time")
    }
}

function buildFilters(fromToData, maxDurationMinutes, minDepartureTime, maxDepartureTime, minArrivalTime, maxArrivalTime) {
    const filters = {
        fromCity: fromToData.fromCity,
        fromCountry: fromToData.fromCountry,
        toCity: fromToData.toCity,
        toCountry: fromToData.toCountry
    }
    if (maxDurationMinutes !== undefined) {
        filters.durationSort = {
            $lte: parseInt(maxDurationMinutes)
        }
    }
    if (minDepartureTime !== undefined || maxDepartureTime !== undefined) {
        filters.departureTimeSort = {}
    }
    if (minDepartureTime !== undefined) {
        filters.departureTimeSort.$gte = timeUtils.timeStringToMinutes(minDepartureTime)
    }
    if (maxDepartureTime !== undefined) {
        filters.departureTimeSort.$lte = timeUtils.timeStringToMinutes(maxDepartureTime)
    }
    if (minArrivalTime !== undefined || maxArrivalTime !== undefined) {
        filters.arrivalTimeSort = {}
    }
    if (minArrivalTime !== undefined) {
        filters.arrivalTimeSort.$gte = timeUtils.timeStringToMinutes(minArrivalTime)
    }
    if (maxArrivalTime !== undefined) {
        filters.arrivalTimeSort.$lte = timeUtils.timeStringToMinutes(maxArrivalTime)
    }
    console.log(filters)
    return filters
}

module.exports = {renewConnections, getConnections}