import { StatusCodes } from "http-status-codes";
import { Router } from "express";

const router = Router();

router.get("/", (_, res) => {
  res.send("Hello, World!");
});

router.get("/teste", (req, res) => {
  console.log(req);
  return res.status(StatusCodes.ACCEPTED).json(req.body);
});

export { router };
