import routes from "../routes";
import dbconfig from "../config/database";
import mysql from "mysql";
import {connection} from "../app";

export const getHome = (req, res) => {
    res.render("tuto.html");
}

export const getUserInfo = (req, res) => {
    connection.query("SELECT * from USER_INFO", function(err, rows){
        if(err)
            throw err;
        console.log("The solution is: ", rows);
        res.send(rows);
    });
}