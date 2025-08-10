const request = require('request');


const weatherCodes = {
    0: { day: "☀️ Clear sky", night: "🌙 Clear sky" },
    1: { day: "🌤️ Mainly clear", night: "🌙 Mainly clear" },
    2: { day: "⛅ Partly cloudy", night: "☁️ Partly cloudy" },
    3: { day: "☁️ Overcast", night: "☁️ Overcast" },
    45: { day: "🌫️ Fog", night: "🌫️ Fog" },
    48: { day: "🌫️ Depositing rime fog", night: "🌫️ Depositing rime fog" },
    51: { day: "🌦️ Light drizzle", night: "🌦️ Light drizzle" },
    53: { day: "🌦️ Moderate drizzle", night: "🌦️ Moderate drizzle" },
    55: { day: "🌧️ Dense drizzle", night: "🌧️ Dense drizzle" },
    56: { day: "❄️ Light freezing drizzle", night: "❄️ Light freezing drizzle" },
    57: { day: "❄️ Dense freezing drizzle", night: "❄️ Dense freezing drizzle" },
    61: { day: "🌦️ Slight rain", night: "🌦️ Slight rain" },
    63: { day: "🌧️ Moderate rain", night: "🌧️ Moderate rain" },
    65: { day: "🌧️ Heavy rain", night: "🌧️ Heavy rain" },
    66: { day: "🌨️ Light freezing rain", night: "🌨️ Light freezing rain" },
    67: { day: "🌨️ Heavy freezing rain", night: "🌨️ Heavy freezing rain" },
    71: { day: "🌨️ Slight snow fall", night: "🌨️ Slight snow fall" },
    73: { day: "❄️ Moderate snow fall", night: "❄️ Moderate snow fall" },
    75: { day: "❄️ Heavy snow fall", night: "❄️ Heavy snow fall" },
    77: { day: "❄️ Snow grains", night: "❄️ Snow grains" },
    80: { day: "🌦️ Slight rain showers", night: "🌦️ Slight rain showers" },
    81: { day: "🌦️ Moderate rain showers", night: "🌦️ Moderate rain showers" },
    82: { day: "🌧️ Violent rain showers", night: "🌧️ Violent rain showers" },
    85: { day: "🌨️ Slight snow showers", night: "🌨️ Slight snow showers" },
    86: { day: "🌨️ Heavy snow showers", night: "🌨️ Heavy snow showers" },
    95: { day: "⛈️ Thunderstorm", night: "⛈️ Thunderstorm" },
    96: { day: "⛈️ Thunderstorm with slight hail", night: "⛈️ Thunderstorm with slight hail" },
    99: { day: "⛈️ Thunderstorm with heavy hail", night: "⛈️ Thunderstorm with heavy hail" }
};

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (!body || !body.current_weather) {
            console.log('DEBUG API RESPONSE:', body);
            callback('Unable to find location', undefined);
        } else {
            const { temperature, windspeed, weathercode, is_day } = body.current_weather;
            const weatherInfo = weatherCodes[weathercode] || { day: "🌈 Unknown", night: "🌈 Unknown" };
            const desc = is_day ? weatherInfo.day : weatherInfo.night;

            callback(undefined, `${desc}. It is currently ${temperature}°C with wind speed of ${windspeed} km/h.`);
        }
    });
};

module.exports = forecast;