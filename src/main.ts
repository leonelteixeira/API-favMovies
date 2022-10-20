import 'dotenv/config'
// import 'reflect-metadata'
// import { DataSource } from "typeorm"
import express from 'express';
import moviesRoutes from './movies.routes'
import Movie from "./models/Movie"

// import './database/connect'
// import { AppDataSource } from './database/connect';

const app = express();
app.use(express.json());

app.use(moviesRoutes)

app.listen(process.env.SERVER_PORT, () => {
    console.log(`🚀 Server started at http://localhost:${process.env.SERVER_PORT}`)
});