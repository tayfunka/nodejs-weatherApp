const request = require('request')
require('dotenv').config()

const MAPBOX_KEY = process.env.MAPBOX_KEY;

const geocode = (adress, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adress) + '.json?access_token=' + MAPBOX_KEY + '&limit=1'
    request({ url, json: true }, (error, { body }) => { // (error, response) = callback
        if (error) {
            callback('Unable to connet to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode