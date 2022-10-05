import express, { request, response } from 'express';

const app = express();

app.get('/', (request, response) => {
    return response.json({ message: 'Hello World' });
});

app.listen(process.env.SERVER_PORT, () => {
    console.log('Server started at http://localhost:${process.env.SERVER_PORT}')
});