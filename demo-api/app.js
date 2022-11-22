import cors from 'cors';
import dotenv  from "dotenv"
import express from 'express';
import parser from 'body-parser';
import apiRouter from './src/routes/api.js';

/* Make enviropnment variables from the dotenv file available */
dotenv.config();

/* Initialize express */
const app = express();

/* Set up middlewares & application configuration */
app.use(cors());
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

/* API routes */
app.use('/', apiRouter);

/* Initialize the API server */
const port = process.env.API_PORT || 3001;

app.listen( port, () => {
  console.log(`Server running on: ${port}.`)
});

export default app;
