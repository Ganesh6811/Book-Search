import { Router } from "express";
import { getBookById, getLatestBooks, searchingBook } from "../controllers/Books.controller.js";
import protectedRoute from "../middleware/protectedRoute.js";

const route = Router();

route.get("/getLatestBooks",protectedRoute, getLatestBooks);
route.get("/getBookById/:id",protectedRoute, getBookById);
route.post("/searching",protectedRoute, searchingBook);

export default route;