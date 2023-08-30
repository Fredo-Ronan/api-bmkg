import { Router } from "express";

const router = Router();

router.get('/example', (req, res) => {

    const query = req.query["query"];

    console.log(query);

    res.json({message: 'Example bro!'});
});

export default router