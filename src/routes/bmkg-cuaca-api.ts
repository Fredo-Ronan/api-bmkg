
import { Router } from "express";

import { Wilayah, Forecast, TimeRange } from './api-config-cuaca/classes';
import findLocation from './findLocation';
import { parseString } from 'xml2js';

const router = Router();

const { DOMParser } = require('xmldom');

const parser = new DOMParser();

router.get('/bmkg-cuaca-api', (req, res) => {
    const query = req.query["location"];

    const queryStr: string = <string>query;

    console.log(query);

    let jsonReady;
    let xmlData;
    
    const area: string = findLocation(queryStr);

    if(area != "lokasi tidak tersedia" && area != "error URL parameter"){
        fetch(area).then(res => {
            return res.text();
        }).then(data => {
            xmlData = parser.parseFromString(data, "text/xml");
    
    
            parseString(xmlData, (err, result) => {
                if(err){
                    console.error(err);
                    return;
                }
    
                // console.log(JSON.stringify(result, null, 2));
                // jsonData = result;
    
                let forecast = JSON.stringify(result.data.forecast, null, 2)
                // console.log(forecast)
                jsonReady = JSON.parse(forecast)
    
                let arrayOfWilayah: Array<Wilayah> = [];
                let forecastParameter: string = "NULL";
    
    
                // WILAYAH
                for(let i = 0; i<jsonReady[0].area.length; i++){
                    if(!jsonReady[0].area[i].$.description.includes('Pelabuhan')){
    
                        let arrayOfForecast: Array<Forecast> = [];
                        
                        // FORECAST
                        for(let j = 0; j<jsonReady[0].area[i].parameter.length; j++){
    
                            let arrayOfTimeRange: Array<TimeRange> = [];
                            // TIME RANGE
                            for(let k = 0; k<jsonReady[0].area[i].parameter[j].timerange.length; k++){
                                arrayOfTimeRange.push(
                                    new TimeRange(
                                        jsonReady[0].area[i].parameter[j].timerange[k].$,
                                        jsonReady[0].area[i].parameter[j].timerange[k].value
                                    )
                                )
                            }
                            // END OF TIME RANGE
    
                            arrayOfForecast.push(
                                new Forecast(
                                    jsonReady[0].area[i].parameter[j].$.description,
                                    jsonReady[0].area[i].parameter[j].$.type,
                                    arrayOfTimeRange
                                )
                            )
                        }
                        // END OF FORECAST
                        
    
                        arrayOfWilayah.push(
                            new Wilayah(
                                jsonReady[0].area[i].$.domain,
                                jsonReady[0].area[i].$.description,
                                jsonReady[0].area[i].$.longitude,
                                jsonReady[0].area[i].$.latitude,
                                arrayOfForecast
                            )
                        )
                    }
                }
    
                res.json({message: arrayOfWilayah})
            });
        });
    } else {
        res.json({message: area});
    }
});

export default router