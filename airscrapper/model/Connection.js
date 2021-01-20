const mongoose = require("mongoose")

const schema = mongoose.Schema({
    fromCity: String,
    fromCountry: String,
    toCity: String,
    toCountry: String,
    departureTime: String,
    departureTimeSort: Number,
    arrivalTime: String,
    arrivalTimeSort: Number,
    duration: String,
    durationSort: Number,
    airline: String,
    monday: Boolean,
    tuesday: Boolean,
    wednesday: Boolean,
    thursday: Boolean,
    friday: Boolean,
    saturday: Boolean,
    sunday: Boolean
})

module.exports = mongoose.model("connection", schema)