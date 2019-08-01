'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
let test1 = [];

const PORT = process.env.PORT || 3000;

app.use(cors());
//create a route with a method of get and a path of location
app.get('/location', (request, response) => {
    try {
        let locationData = getData(request.query.data);
        response.send(locationData);
    } catch (error) {
        console.log('There was an error!');
    }
});

app.get('/weather', (request, response) => {
    try {
        let jsonData = require('./data/darksky.json');
        const test = jsonData.daily.data;
        for (let i = 0; i < test.length; i++) {
            new Weather(test[i].time, test[i].summary);
        }
        response.send(test1);
    } catch (error) {
        console.log('There was an error loading the weather data')
    }
})

//function to be invoked by the get() 

function getData(locationName) {
    let jsonData = require('./data/geo.json');
    let location = new Location(locationName, jsonData);
    return location;
}

// function constructor
function Location(query, jsonData) {
    this.sear_query = query;
    this.formatted_query = jsonData.results[0].formatted_address, this.latitude = jsonData.results[0].geometry.location.lat, this.longitude = jsonData.results[0].geometry.location.lng
}

function Weather(time, summary) {
    this.time = new Date(time * 1000);
    this.summary = summary;
    test1.push(this);
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))