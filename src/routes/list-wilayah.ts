
import { Router } from "express";

import { daftarWilayah } from './api-config-cuaca/links';

const router = Router();

router.get('/list-wilayah', (req, res) => {
    const daftarAreaWilayah = Object.keys(daftarWilayah);

    res.json({author: "Fredo Ronan", message: daftarAreaWilayah});
});

export default router