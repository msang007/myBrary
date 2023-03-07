import express from "express";
import expressLayouts from "express-ejs-layouts";
import path from "path";
import { fileURLToPath } from 'url';
import dotenv from "dotenv";
import router from "./routes/index.js";
import mysql from "mysql";

;
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



app.use('/',router);

const port = ENV.Port || 8080;
app.listen(port,()=> console.log(`listening on port ${port}`));