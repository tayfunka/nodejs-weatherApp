const path = require('node:path');
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Tayfun'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'About Name',
        aboutText: 'A weather application that interacts with the MapBox and Weatherstack APIs'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'A weather application that interacts with the MapBox and Weatherstack APIs',
        title: 'Help',
        name: 'Help Name'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.adress) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    geocode(req.query.adress, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                adress: req.query.adress
            })
        })
    })
})


app.get('/about/*', (req, res) => {
    res.render('404', {
        title: 'about name',
        name: 'about title',
        message: 'About article is not found'
    })
})




app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help article is not found'
    })
})


app.get('*', (req, res) => { // it should be at the end.
    res.render('404', {
        title: '404',
        message: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})