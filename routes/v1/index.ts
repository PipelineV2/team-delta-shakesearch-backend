import { profile } from "console";
import {
  Router,
  json,
  NextFunction,
  Request,
  Response,
  urlencoded,
} from "express";

import elasticSearchRoutes from "./elasticSearchRoutes";

const router = Router();

/** /v1/shake-search/ */
router.use("/shake-search", elasticSearchRoutes);

export default router;
