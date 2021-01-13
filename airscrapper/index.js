const express = require("express")
const mongoose = require("mongoose")
const routes = require("./routes")

const DB_URL = "mongodb://127.0.0.1:27017"

mongoose.connect(DB_URL, {useNewUrlParser : true, useUnifiedTopology : true})
.then(() => {
    const app = express()
    app.use(express.json())
    app.use("/api", routes)
    app.listen(5000, () => {
        console.log("Running")
    })
})