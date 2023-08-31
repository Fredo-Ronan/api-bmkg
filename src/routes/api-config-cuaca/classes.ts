////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CLASSES
export class Wilayah {

    provinsi;
    area;
    longitude;
    latitude;
    arrayOfForecast: Array<Forecast> = [];

    constructor(provinsi: string, area: string, longitude: string, latitude: string, arrayOfForecast: Array<Forecast>){
        this.provinsi = provinsi
        this.area = area;
        this.longitude = longitude;
        this.latitude = latitude;
        this.arrayOfForecast = arrayOfForecast;
    }
}


export class Forecast {

    tipePerkiraan;
    tipeWaktuPerkiraan;
    arrayOfTimeRange: Array<TimeRange> = [];

    constructor(tipePerkiraan: string, tipeWaktuPerkiraan: string, arrayOfTimeRange: Array<TimeRange>){
        this.tipePerkiraan = tipePerkiraan;
        this.tipeWaktuPerkiraan = tipeWaktuPerkiraan;
        this.arrayOfTimeRange = arrayOfTimeRange;
    }
}


export class TimeRange {

    waktu;
    value;

    constructor(waktu: string, value: string){
        this.waktu = waktu;
        this.value = value;
    }
}