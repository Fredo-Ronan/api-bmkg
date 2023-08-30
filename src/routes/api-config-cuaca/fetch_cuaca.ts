
import { daftarWilayah } from './links';
import { parseString } from 'xml2js';

// import { constructArrayOfWilayah } from './js/main_functions'
// import { fetchDataCuaca } from './js/main_script';

const { DOMParser } = require('xmldom')

const parser = new DOMParser();

export async function fetchDataCuaca(lokasi: string){

    let jsonReady;
    let jsonData;
    let xmlData;
    const listWilayah: Record<string, string> = daftarWilayah
    const area: string = listWilayah[lokasi]

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
            console.log(forecast)
            jsonReady = forecast

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


export async function fetchCuaca(lokasi: string){

    const resultJSON = fetchDataCuaca(lokasi)

    console.log(resultJSON)

    return resultJSON
}