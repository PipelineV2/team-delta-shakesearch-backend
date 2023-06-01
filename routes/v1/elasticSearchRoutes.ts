import { Router } from "express";
import createIndexController from "../../controllers/elastic-search/create-index.controller";
import queryIndexController from "../../controllers/elastic-search/query-index.controller";
const router = Router();

/** /v1/auth/ */
router.get("/", (req, res) => {
  return res.json({ message: "User routes" });
});

/** /v1/index-data/register */
// router.post("/index-data", registerValidators, registerController);

/** /v1/shake-search/create-index */
router.post("/create-index", createIndexController);

/** /v1/shake-search/search */
router.post("/search", queryIndexController);

export default router;
