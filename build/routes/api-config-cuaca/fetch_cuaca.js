"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCuaca = exports.fetchDataCuaca = void 0;
const links_1 = require("./links");
const xml2js_1 = require("xml2js");
// import { constructArrayOfWilayah } from './js/main_functions'
// import { fetchDataCuaca } from './js/main_script';
const { DOMParser } = require('xmldom');
const parser = new DOMParser();
async function fetchDataCuaca(lokasi) {
    let jsonReady;
    let jsonData;
    let xmlData;
    const listWilayah = links_1.daftarWilayah;
    const area = listWilayah[lokasi];
    fetch(area).then(res => {
        return res.text();
    }).then(data => {
        xmlData = parser.parseFromString(data, "text/xml");
        (0, xml2js_1.parseString)(xmlData, (err, result) => {
            if (err) {
                console.error(err);
                return;
            }
            // console.log(JSON.stringify(result, null, 2));
            // jsonData = result;
            let forecast = JSON.stringify(result.data.forecast, null, 2);
            console.log(forecast);
            jsonReady = forecast;
            // let wilayah = constructArrayOfWilayah(result.data.forecast.area);
            // console.log(wilayah);
            // let arrayJson = [];
            // arrayJson.push(
            //     {"author": "Fredo Ronan"}
            // );
            // wilayah.forEach(data => {
            //     arrayJson.push({
            //         Provinsi: data.provinsi,
            //         Wilayah: data.area,
            //         Longitude: data.longitude,
            //         Latitude: data.latitude,
            //         Coordinat: data.latitude + " " + data.longitude,
            //         Forecast: data.arrayOfForecast
            //     });
            // })
            // console.log(JSON.stringify(arrayJson, null, 4));
            // jsonReady = JSON.stringify(arrayJson, null, 4);
        });
    });
}
exports.fetchDataCuaca = fetchDataCuaca;
async function fetchCuaca(lokasi) {
    const resultJSON = fetchDataCuaca(lokasi);
    console.log(resultJSON);
    return resultJSON;
}
exports.fetchCuaca = fetchCuaca;
