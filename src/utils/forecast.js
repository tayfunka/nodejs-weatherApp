const request = require('request')
require('dotenv').config()
const WEATHERSTACK_KEY = process.env.WEATHERSTACK_KEY;

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=' + WEATHERSTACK_KEY + '&query=' + latitude + ',' + longitude + '&units=m'
    request({ url, json: true }, (error, { body }) => { // (error, response) = callback
        if (error) {
            callback('Unable to connet to location services!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined,
                body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. There is a ' + body.current.precip + '% chance of rain.'
            )
        }
    })
}

module.exports = forecast