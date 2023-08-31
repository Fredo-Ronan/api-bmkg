"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const links_1 = require("./api-config-cuaca/links");
const findLocation = (query) => {
    const listWilayah = links_1.daftarWilayah;
    const daftarAreaWilayah = Object.keys(links_1.daftarWilayah);
    const regex = /^[a-zA-Z][a-z]*([A-Z][a-z]*)*$/;
    const findQuery = query.toLowerCase();
    let wilayahKetemu = "";
    let isFound = false;
    if (regex.test(query)) {
        daftarAreaWilayah.forEach(dataWilayah => {
            if (dataWilayah.toLowerCase() == findQuery) {
                wilayahKetemu = listWilayah[dataWilayah];
                isFound = true;
            }
        });
        if (!isFound) {
            // throw new Error("lokasi tidak tersedia");
            return "lokasi tidak tersedia";
        }
    }
    else {
        // throw new Error("error URL parameter");
        return "error URL parameter";
    }
    return wilayahKetemu;
};
exports.default = findLocation;
