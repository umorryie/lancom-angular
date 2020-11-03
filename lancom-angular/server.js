const express = require('express');
const cors = require('cors');
const puppeteer = require("puppeteer");
const fetch = require('node-fetch');
const app = express();
const cherio = require('cheerio');
const axios = require("axios")
const { JSDOM } = require('jsdom')
app.use(cors());

const port = 8000;
 
app.get('/products', function (req, res, next) {
    //const { cityName } = req.param;
    const cityName = 'Maribor';
    const apiKey = '737a23c3051627e22edea77974b4716a';
    const data = fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`)
    .then(response => response.json())
    .then(list => {
        const information = processListOfWeatherCasts(list);
        const rezultat = information.map(el=>{
            const key = Object.keys(el);
            return el[key[0]].map(i=>{
                return {
                        date:i['dt_txt'],
                        temperature:i.main.temp,
                        description: i.weather[0].main,
                        wind: i.wind.speed
                };
            });
        });
        res.json(rezultat);
    });
});

app.get('/maribor', function (req, res, next) {
    const cityName = 'Maribor';
    const apiKey = '737a23c3051627e22edea77974b4716a';
    const data = fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`)
    .then(response => response.json())
    .then(list => {
        const maribor = {
            temp: Math.round((list.list[0].main.temp - 272.15) * 10) / 10,
            description: list.list[0].weather[0].main,
            minTemp:Math.round((list.list[0].main.temp_min - 272.15) * 10) / 10,
            maxTemp: Math.round((list.list[0].main.temp_max - 272.15) * 10) / 10,
            time: list.list[0].dt_txt,
            wind: list.list[0].wind.speed
        };
        console.log(maribor);
        res.json(maribor);
    });
});
 
 

async function fetchHTML(url) {
    const { data } = await axios.get(url)
    return cherio.load(data)
  }
  async function neke(){
      const $ = await fetchHTML("https://openweathermap.org/city/3195506")
      const text = $.html();
      // Print the full HTML
      console.log(cherio('ul > li',text));
      //console.log(`Site HTML: ${$('ul > li')}\n\n`)
}
app.listen(port, async function () {
  /*console.log(`CORS-enabled web server listening on port ${port}`);
  fetch("https://openweathermap.org/city/3195506")
  .then(htmlResponse => htmlResponse.text())
  .then(data=>{
    console.log(cherio('ul > li',data));
  });
  //neke();
  const te = await fetchHTML("https://openweathermap.org/city/3195506");
  const $ = cherio.load(te.html());
  const { document } = new JSDOM($).window;
  const heading = document.querySelector('ul')
  console.log(heading);*/

});


async function get(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.amazon.de/-/en/Aur%C3%A9lien-G%C3%A9ron/dp/3960091249?pd_rd_w=yTk8X&pf_rd_p=26a69915-0c81-42f1-9f66-a70330ba3e45&pf_rd_r=7KPEDDB2T6W9EVGVRZ8T&pd_rd_r=78ca7758-ca93-4456-a816-344bcc049874&pd_rd_wg=VsVdi');

    const [el] = await page.$x('//*[@id="imgBlkFront"]');
    const src = await el.getProperty('src');
    const txt = await src.jsonValue();
    await console.log(txt);
    //await console.log(el);

    await page.close();

}

function processListOfWeatherCasts(list){
    const differentDays = list.list.map(day => day['dt_txt']); 
    let setDays = new Set();
    const differentDayz = differentDays.map(day => {
        setDays.add(day.substring(0,10))
        return day.substring(0,10)});
    /*console.log(differentDayz);
    let unis = [];
    const unieuqDays = Array.from(setDays);
    const daysObjects = Array.from(setDays);
    list.list.forEach(day => {
        let i = 0;

    })*/
    const unieuqDays = Array.from(setDays);
    const rezultat = unieuqDays.map( element =>{
        const novi = list.list.filter(el=>el['dt_txt'].includes(element));
        return {[element]: novi};
    })
    return rezultat;
}