import express from "express";
import expressLayouts from "express-ejs-layouts";
import path from "path";
import { fileURLToPath } from 'url';
import dotenv from "dotenv";
import router from "./routes/index.js";
import authorRouter from "./routes/authors.js";
import mysql from "mysql";
import mongoose from 'mongoose';
import bodyParser from "body-parser";


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const location = path.join(__dirname, "./public");
const ENV = dotenv.config().parsed;
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static(location));
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}));

//connection to mongoose process
mongoose.connect(ENV.DATABASE_URL,{useNewUrlParser: true })
const db= mongoose.connection
db.on('error', error => console.error(error))
db.once('open',()=> console.log('connected to mongoose'))
/*
var con = mysql.createConnection({
    host: ENV.DB_HOST,
    user: ENV.DB_USER,
    password: ENV.DB_PASSWORD,
    database: ENV.DB_NAME
});
con.connect((err, connection) => {
    if (err) {
        throw err
    }
    else {
        console.log('Connected to mybrary database!');
    }
});

*/

app.use('/',router);
app.use('/authors',authorRouter);

const port = ENV.Port || 8080;
app.listen(port,()=> console.log(`listening on port ${port}`));