import {Request, Response} from "express";
import usersRoutes from "./modules/users/routes/users";
import productsRoutes from "./modules/products/routes/products";
import { Router } from "express";

const routes = Router();
routes.get("/", async function (req: Request, res: Response) {
    res.send(`Reached home!`);
});

routes.use("/", usersRoutes);
routes.use("/", productsRoutes);

export default routes;
