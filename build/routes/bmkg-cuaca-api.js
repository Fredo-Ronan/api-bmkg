"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const classes_1 = require("./api-config-cuaca/classes");
const findLocation_1 = __importDefault(require("./findLocation"));
const xml2js_1 = require("xml2js");
const router = (0, express_1.Router)();
const { DOMParser } = require('xmldom');
const parser = new DOMParser();
router.get('/bmkg-cuaca-api', (req, res) => {
    const query = req.query["location"];
    if (query != undefined) {
        const queryStr = query;
        console.log(query);
        let jsonReady;
        let xmlData;
        const area = (0, findLocation_1.default)(queryStr);
        if (area != "lokasi tidak tersedia" && area != "error URL parameter") {
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
                    // console.log(forecast)
                    jsonReady = JSON.parse(forecast);
                    let arrayOfWilayah = [];
                    let forecastParameter = "NULL";
                    // WILAYAH
                    for (let i = 0; i < jsonReady[0].area.length; i++) {
                        if (!jsonReady[0].area[i].$.description.includes('Pelabuhan')) {
                            let arrayOfForecast = [];
                            // FORECAST
                            for (let j = 0; j < jsonReady[0].area[i].parameter.length; j++) {
                                let arrayOfTimeRange = [];
                                // TIME RANGE
                                for (let k = 0; k < jsonReady[0].area[i].parameter[j].timerange.length; k++) {
                                    arrayOfTimeRange.push(new classes_1.TimeRange(jsonReady[0].area[i].parameter[j].timerange[k].$, jsonReady[0].area[i].parameter[j].timerange[k].value));
                                }
                                // END OF TIME RANGE
                                arrayOfForecast.push(new classes_1.Forecast(jsonReady[0].area[i].parameter[j].$.description, jsonReady[0].area[i].parameter[j].$.type, arrayOfTimeRange));
                            }
                            // END OF FORECAST
                            arrayOfWilayah.push(new classes_1.Wilayah(jsonReady[0].area[i].$.domain, jsonReady[0].area[i].$.description, jsonReady[0].area[i].$.longitude, jsonReady[0].area[i].$.latitude, arrayOfForecast));
                        }
                    }
                    res.json({ author: "Fredo Ronan", message: arrayOfWilayah });
                });
            });
        }
        else {
            res.json({ author: "Fredo Ronan", message: area });
        }
    }
    else {
        res.json({ author: "Fredo Ronan", message: "Error URL query, check your URL parameter" });
    }
});
exports.default = router;
