import express, {Request, Response} from 'express';
import exampleRouter from './routes/example'
import bmkgCuacaApi from './routes/bmkg-cuaca-api';

import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use('/api', exampleRouter);
app.use('/api', bmkgCuacaApi);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})