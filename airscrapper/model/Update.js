const mongoose = require("mongoose")

const schema = mongoose.Schema({
    fromCity: String,
    fromCountry: String,
    toCity: String,
    toCountry: String,
    lastUpdate: Date
})

module.exports = mongoose.model("update", schema)