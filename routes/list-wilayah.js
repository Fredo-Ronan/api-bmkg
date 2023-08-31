"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const links_1 = require("./api-config-cuaca/links");
const router = (0, express_1.Router)();
router.get('/list-wilayah', (req, res) => {
    const daftarAreaWilayah = Object.keys(links_1.daftarWilayah);
    res.json({ author: "Fredo Ronan", message: daftarAreaWilayah });
});
exports.default = router;
