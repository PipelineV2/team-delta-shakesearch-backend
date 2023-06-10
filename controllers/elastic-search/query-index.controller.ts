import { NextFunction, Request, Response } from "express";
import AsyncHandler from "../../utils/asyncHandler";
import { elasticSearchService } from "../../services/elastic-search";
import sendSuccessApiResponse from "../../utils/response/sendSuccessApiResponse";
import sendErrorApiResponse from "../../utils/response/sendErrorApiResponse";
export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.query || req.body.query == "") {
      return sendErrorApiResponse({
        res,
        statusCode: 422,
        status: "error",
        message: "Invalid search query",
      });
    }
    const result = await elasticSearchService.search(req.body.query);

    return sendSuccessApiResponse({
      res,
      message: "results",
      data: result.hits.hits,
      status: "success",
    });
  }
);
