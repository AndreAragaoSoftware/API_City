import { StatusCodes } from "http-status-codes";
import { Router } from "express";

import { ConcelhosController } from "./../controllers/index ";

const router = Router();


router.get("/", (_, res) => {
  res.send("Hello, World!");
});

router.post("/concelhos", ConcelhosController.create);
 

export { router };
