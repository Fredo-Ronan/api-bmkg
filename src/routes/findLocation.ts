
import { daftarWilayah } from './api-config-cuaca/links';

const findLocation = (query: string): string => {
    
    const listWilayah: Record<string, string> = daftarWilayah;
    const daftarAreaWilayah = Object.keys(daftarWilayah);
    const regex = /^[a-zA-Z][a-z]*([A-Z][a-z]*)*$/;

    const findQuery: string = query.toLowerCase();
    let wilayahKetemu: string = "";
    let isFound: boolean = false;

    if(regex.test(query)){
        daftarAreaWilayah.forEach(dataWilayah => {
            if(dataWilayah.toLowerCase() == findQuery){
                wilayahKetemu = listWilayah[dataWilayah];
                isFound = true;
            }
        });

        if(!isFound){
            // throw new Error("lokasi tidak tersedia");
            return "lokasi tidak tersedia";
        }
    } else {
        // throw new Error("error URL parameter");
        return "error URL parameter";
    }

    return wilayahKetemu;
}

export default findLocation;