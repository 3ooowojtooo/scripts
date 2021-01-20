const Connection = require('../model/Connection')
const timeUtils = require('../utils/timeUtils')

function mapToConnections(connectionsData) {
    return connectionsData.map(mapToConnection)
}

function mapToConnection(connection) {
    const availableDays = mapAvailableDays(connection.availability)
    return new Connection({
        fromCity: connection.fromCity,
        fromCountry: connection.fromCountry,
        toCity: connection.toCity,
        toCountry: connection.toCountry,
        arrivalTime: connection.arrivalTime,
        arrivalTimeSort: timeUtils.timeStringToMinutes(connection.arrivalTime),
        departureTime: connection.departureTime,
        departureTimeSort: timeUtils.timeStringToMinutes(connection.departureTime),
        durationSort: parseInt(connection.durationMinutes),
        duration: timeUtils.minutesToDurationString(connection.durationMinutes),
        airline: connection.airline,
        monday: availableDays[0],
        tuesday: availableDays[1],
        wednesday: availableDays[2],
        thursday: availableDays[3],
        friday: availableDays[4],
        saturday: availableDays[5],
        sunday: availableDays[6]
    })
}

function mapAvailableDays(availabilityString) {
    let daysAvailability = [false, false, false, false, false, false, false]
    for (let i = 0; i < 7; i++) {
        if (availabilityString.includes((i + 1).toString())) {
            daysAvailability[i] = true
        }
    }
    return daysAvailability
}

function mapToResponse(connectionModels) {
    return connectionModels.map(mapToResponseEntity)
}

function mapToResponseEntity(connection) {
    return {
        fromCity: connection.fromCity,
        fromCountry: connection.fromCountry,
        toCity: connection.toCity,
        toCountry: connection.toCountry,
        airline: connection.airline,
        departureTime: connection.departureTime,
        arrivalTime: connection.arrivalTime,
        duration: connection.duration,
        monday: connection.monday,
        tuesday: connection.tuesday,
        wednesday: connection.wednesday,
        thursday: connection.thursday,
        friday: connection.friday,
        saturday: connection.saturday,
        sunday: connection.sunday
    }
}

module.exports = {
    mapToConnections, mapToResponse
}