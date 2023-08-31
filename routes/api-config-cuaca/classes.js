"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeRange = exports.Forecast = exports.Wilayah = void 0;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CLASSES
class Wilayah {
    constructor(provinsi, area, longitude, latitude, arrayOfForecast) {
        this.arrayOfForecast = [];
        this.provinsi = provinsi;
        this.area = area;
        this.longitude = longitude;
        this.latitude = latitude;
        this.arrayOfForecast = arrayOfForecast;
    }
}
exports.Wilayah = Wilayah;
class Forecast {
    constructor(tipePerkiraan, tipeWaktuPerkiraan, arrayOfTimeRange) {
        this.arrayOfTimeRange = [];
        this.tipePerkiraan = tipePerkiraan;
        this.tipeWaktuPerkiraan = tipeWaktuPerkiraan;
        this.arrayOfTimeRange = arrayOfTimeRange;
    }
}
exports.Forecast = Forecast;
class TimeRange {
    constructor(waktu, value) {
        this.waktu = waktu;
        this.value = value;
    }
}
exports.TimeRange = TimeRange;
