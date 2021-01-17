const Connection = require('../model/Connection')

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
        arrivalTimeSort: timeStringToMinutes(connection.arrivalTime),
        departureTime: connection.departureTime,
        departureTimeSort: timeStringToMinutes(connection.departureTime),
        durationSort: parseInt(connection.durationMinutes),
        duration: minutesToDurationString(connection.durationMinutes),
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
        if (availabilityString.includes((i+1).toString())) {
            daysAvailability[i] = true
        }
    }
    return daysAvailability
}

function timeStringToMinutes(timeString) {
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
    return hourValue * 60 + minuteValue
}

function minutesToDurationString(minutes) {
    const minutesValue = parseInt(minutes)
    const hour = Math.floor(minutesValue / 60)
    const minute = minutesValue % 60
    return hour + "h " + minute + "m"
}

module.exports = mapToConnections