import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dbconfig from "./config/database";
import ejs from "ejs";
import env from "dotenv";
import express from "express";
import morgan from "morgan";
import mysql from "mysql";
import routes from "./routes";
import globalRouter from "./router/globalRouter";

env.config();

export const connection = mysql.createConnection(dbconfig);

const PORT = process.env.PORT || 5000;
const app = express();

const successAlert = () => {
    console.log(`Server listening on port ` + PORT);
}

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", ejs.renderFile);
app.use(express.static('public'));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan("dev"));

// app.set("port", port);

/* app.get(routes.home, function(req, res){
    res.send("Root");
});

app.get(routes.userinfo, function(req, res){
    connection.query("SELECT * from User_Info", function(err, rows){
        if(err)
            throw err;
        
        console.log("The solution is: ", rows);
        res.send(rows);
    });
}); */

app.use(routes.home, globalRouter);

app.listen(PORT, successAlert);