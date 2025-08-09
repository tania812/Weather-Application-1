const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
// Define paths for Express config
const publicdirectorypath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicdirectorypath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Tania Thakur'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Tania Thakur'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        Helptext: 'Any help if you want feel free to ask',
        name: 'Tania Thakur',
        contact: 8100591078,
        email: 'taniathakur@812'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: "You must provided an address!"
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: "You must provided a search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Tania Thakur',
        errorMessage: "Help article not found"
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Tania Thakur',
        errorMessage: "Page not found"
    })
})
const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => {
    console.log('Server is up on port 3000.')
})