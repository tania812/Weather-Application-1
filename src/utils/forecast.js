const request = require('request');

const forecast = (latitude, longitude, callback) => {
    //const url = 'https://api.weatherstack.com/current?access_key=eb82fa7dde632c825d675f1b8abdf41a&query=' + latitude + ',' + longitude + '&units=f'
    const url = 'https://api.weatherstack.com/current?access_key=eb82fa7dde632c825d675f1b8abdf41a&query=' + latitude + ',' + longitude + '&units=m'


    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to Connect to Weather Service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ".It is currently " + body.current.temperature + " degree out. It feels like " + body.current.feelslike + " degree out")
        }
    })
}

module.exports = forecast;