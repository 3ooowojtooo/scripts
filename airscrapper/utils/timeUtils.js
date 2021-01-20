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

module.exports = {timeStringToMinutes, minutesToDurationString}