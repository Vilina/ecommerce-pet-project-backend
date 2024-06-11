import { Router } from "express";
import usersRouter from "./users";
import productsRouter from "./products";
import authRouter from "./auth";

const router = Router();

router.use(usersRouter);
router.use(productsRouter);
router.use(authRouter);

export default router;