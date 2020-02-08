import express from "express";
import routes from "../routes";
import { getHome, getUserInfo } from "../controller/globalController";

const globalRouter = express.Router();

globalRouter.get(routes.home, getHome);
globalRouter.get(routes.userinfo, getUserInfo);

export default globalRouter;