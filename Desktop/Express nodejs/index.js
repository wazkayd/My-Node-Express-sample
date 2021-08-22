const { json } = require('express')
const express = require('express')
const path = require('path')
const logger = require('./middleware/logger')
const router = require('./routes/api/members')

const app = express()

      // Initialise Middleware: Logger
// app.use(logger)

     // Initialise BodyParser Middleware : Express-Built-in Bodyparser!
app.use(express.json()) // Handles Json!
app.use(express.urlencoded({ extended: false })) // Form Submition!

     // Set Static Folder: public
app.use(express.static(path.join(__dirname, 'public')))

    //  Members API Routes
app.use("/api/members", require('./routes/api/members'))

const PORT = process.env.PORT || 5000 

app.listen(PORT, () => console.log(`Server Started On port ${PORT}`))
