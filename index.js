"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require('path'));
const example_1 = __importDefault(require("./routes/example"));
const bmkg_cuaca_api_1 = __importDefault(require("./routes/bmkg-cuaca-api"));
const list_wilayah_1 = __importDefault(require("./routes/list-wilayah"));
// const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
// app.use((0, cors_1.default)());
app.use('/api', example_1.default);
app.use('/api', bmkg_cuaca_api_1.default);
app.use('/api', list_wilayah_1.default);
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/landing-page.html');

});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
