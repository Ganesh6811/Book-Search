import { Router } from "express";
import { checkAuth, login, logOut, signUp } from "../controllers/Auth.controllers.js";
import protectedRoute from "../middleware/protectedRoute.js";

const route = Router();

route.post("/signUp", signUp);
route.post("/login", login);
route.get("/logOut", logOut);
route.get("/checkAuth", protectedRoute, checkAuth);

export default route;