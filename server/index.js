import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyparser from 'body-parser';

//import component

import connection from './database/db.js';

import Routes from './routs/Route.js'

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyparser.json({extended:true}));
app.use(bodyparser.urlencoded({extended:true}));
app.use('/',Routes);

const PORT = 8000;
const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;


connection(username,password);

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));


