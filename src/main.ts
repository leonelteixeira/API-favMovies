import 'dotenv/config'
import express from 'express';

import './database/connect'

const app = express();

app.use(express.json())

app.listen(process.env.SERVER_PORT, () => {
    console.log(`🚀 Server started at http://localhost:${process.env.SERVER_PORT}`)
});