const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
const bodyParser = require('body-parser')
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const port = 8000;

app.get('/products', function (req, res, next) {
    const cityName = 'Maribor';
    const apiKey = '737a23c3051627e22edea77974b4716a';
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&lang=sl&appid=${apiKey}`)
        .then(response => response.json())
        .then(list => {
            const information = getResultsFromListOfWeathercasts(list);
            const mariborInformations = information.map(el => {
                const key = Object.keys(el);
                return el[key[0]].map(i => {
                    return {
                        date: i['dt_txt'],
                        temperature: i.main.temp,
                        description: i.weather[0].description,
                        wind: i.wind.speed
                    };
                });
            });
            res.json(mariborInformations);
        });
});

app.get('/maribor', function (req, res, next) {
    const cityName = 'Maribor';
    const apiKey = '737a23c3051627e22edea77974b4716a';
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&lang=sl&appid=${apiKey}`)
        .then(response => response.json())
        .then(list => {
            const maribor = {
                temp: Math.round((list.list[0].main.temp - 272.15) * 10) / 10,
                description: list.list[0].weather[0].description,
                minTemp: Math.round((list.list[0].main.temp_min - 272.15) * 10) / 10,
                maxTemp: Math.round((list.list[0].main.temp_max - 272.15) * 10) / 10,
                time: list.list[0].dt_txt,
                wind: list.list[0].wind.speed
            };
            res.json(maribor);
        });
});

app.post('/location', function (req, res, next) {
    const { lat, long } = req.body;
    const apiKey = '737a23c3051627e22edea77974b4716a';
    const data = fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&lang=sl&appid=${apiKey}`)
        .then(response => response.json())
        .then(list => {
            const townOfLatAndLon = {
                temp: Math.round((list.list[0].main.temp - 272.15) * 10) / 10,
                description: list.list[0].weather[0].description,
                minTemp: Math.round((list.list[0].main.temp_min - 272.15) * 10) / 10,
                maxTemp: Math.round((list.list[0].main.temp_max - 272.15) * 10) / 10,
                time: list.list[0].dt_txt,
                wind: list.list[0].wind.speed
            };
            townOfLatAndLon.name = list.city.name;
            const information = getResultsFromListOfWeathercasts(list);
            townOfLatAndLon.informacije = information.map(el => {
                const key = Object.keys(el);
                return el[key[0]].map(i => {
                    return {
                        date: i['dt_txt'],
                        temperature: i.main.temp,
                        description: i.weather[0].description,
                        wind: i.wind.speed
                    };
                });
            });
            res.json(townOfLatAndLon);
        });
});

app.listen(port, async function () {
    console.log(`CORS-enabled web server listening on port ${port}`);
});

function getResultsFromListOfWeathercasts(list) {
    const differentDays = list.list.map(day => day['dt_txt']);
    let setDays = new Set();
    differentDays.forEach(day => {
        setDays.add(day.substring(0, 10));
    });
    const unieuqDays = Array.from(setDays);
    const weatherCastResult = unieuqDays.map(element => {
        const mappedDays = list.list.filter(el => el['dt_txt'].includes(element));
        return { [element]: mappedDays };
    })
    return weatherCastResult;
}