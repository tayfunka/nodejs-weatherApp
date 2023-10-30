const request = require('request')

const geocode = (adress, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adress) + '.json?access_token=' + 'pk.eyJ1IjoidGF5ZnVua2ExIiwiYSI6ImNsbnhwYXNjMjBsYnQybG4waGV4MWxiNTYifQ.PMi_A1s8W03WHwRlh9OkpQ' + '&limit=1'
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