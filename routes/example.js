"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/example', (req, res) => {
    const query = req.query["query"];
    console.log(query);
    res.json({ message: 'Example bro!' });
});
exports.default = router;
