const Connection = require('../../model/Connection')
const Update = require('../../model/Update')
const scraper = require('../scraper/scaperService')
const connectionsMapper = require('../../mapper/connectionMapper')
const timeUtils = require('../../utils/timeUtils')
const fetch = require("node-fetch")

const DATA_TTL_MILLISECONDS = 60 * 60 * 1000 // 1 hour

async function getConnections(from, to, maxDurationMinutes, minDepartureTime, maxDepartureTime, minArrivalTime, maxArrivalTime) {
    validateParams(from, to, maxDurationMinutes, minDepartureTime, maxDepartureTime, minArrivalTime, maxArrivalTime)
    const fromToData = await searchFromTo(from, to)
    const update = await Update.findOne({
        fromCity: fromToData.fromCity,
        fromCountry: fromToData.fromCountry,
        toCity: fromToData.toCity,
        toCountry: fromToData.toCountry
    }).exec()
    if (update === null || (Date.now() - update.lastUpdate) > DATA_TTL_MILLISECONDS) {
        console.log("Updating connections")
        await renewConnections(fromToData)
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

async function searchFromTo(from, to) {
    const fromObjects = await searchPhrase(from)
    if (fromObjects.length === 0) {
        throw new Error(from + " location not found")
    }
    const toObjects = await searchPhrase(to)
    if (toObjects.length === 0) {
        throw new Error(to + " location not found")
    }
    const fromObject = fromObjects[0]
    const toObject = toObjects[0]
    const url = buildUrl(fromObject, toObject)
    return {
        fromCity: fromObject.cityName,
        fromCountry: fromObject.countryName,
        toCity: toObject.cityName,
        toCountry: toObject.countryName,
        url: url
    }
}

async function searchPhrase(phrase) {
    const url = "https://srv.wego.com/places/search?language=en&min_airports=1&site_code=US&query=" + phrase
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Host': 'srv.wego.com'
        }
    })
    return response.json()
}

function buildUrl(fromObject, toObject) {
    return "https://www.wego.com/schedules/" + fromObject.cityCode.toLowerCase() + "/" + toObject.cityCode.toLowerCase() + "/cheapest-flights-from-"
        + fromObject.cityPermalink + "-to-" + toObject.cityPermalink
}

async function renewConnections(fromToData) {
    await Connection.deleteMany({
        fromCountry: fromToData.fromCountry,
        fromCity: fromToData.fromCity,
        toCountry: fromToData.toCountry,
        toCity: fromToData.toCity
    }).exec()
    const flights = connectionsMapper.mapToConnections(await scraper.scrapeAll(fromToData.url))
    await Connection.create(flights)
    await Update.deleteOne({
        fromCountry: fromToData.fromCountry,
        fromCity: fromToData.fromCity,
        toCountry: fromToData.toCountry,
        toCity: fromToData.toCity
    }).exec()
    const update = new Update({
        fromCity: fromToData.fromCity,
        fromCountry: fromToData.fromCountry,
        toCity: fromToData.toCity,
        toCountry: fromToData.toCountry,
        lastUpdate: Date.now()
    })
    await update.save()
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

module.exports = {getConnections}