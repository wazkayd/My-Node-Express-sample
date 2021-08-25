const { json } = require('express')
const express = require('express')
const path = require('path')
const exphbs = require ('express-handlebars')
const logger = require('./middleware/logger')
const router = require('./routes/api/members')

const app = express()

      // Initialise Middleware: Logger
// app.use(logger)

     // Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

     // Initialise BodyParser Middleware : Express-Built-in Bodyparser!
app.use(express.json()) // Handles Json!
app.use(express.urlencoded({ extended: false })) // Form Submition!

     // Handlebars Homepage Route
app.get('/', (req, res) => res.render('index'))

     // Set Static Folder: public
app.use(express.static(path.join(__dirname, 'public')))

    //  Members API Routes
app.use("/api/members", require('./routes/api/members'))

const PORT = process.env.PORT || 5000 

app.listen(PORT, () => console.log(`Server Started On port ${PORT}`))
