
import express from "express";
import mysql from "mysql";
import dbconfig from "./config/database";
import env from "dotenv";
import bodyParser from "body-parser";

env.config();

const connection = mysql.createConnection(dbconfig);

const port = process.env.PORT || 5000;
const app = express();

const successAlert = () => {
    console.log(`Server listening on port ` + app.get("port"));
}

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set("port", port);

app.get("/", function(req, res){
    res.send("Root");
});

app.get("/userinfo", function(req, res){
    connection.query("SELECT * from User_Info", function(err, rows){
        if(err)
            throw err;
        
        console.log("The solution is: ", rows);
        res.send(rows);
    });
});

app.listen(app.get("port"), successAlert);