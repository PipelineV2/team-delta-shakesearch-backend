import { NextFunction, Request, Response } from "express";
import AsyncHandler from "../../utils/asyncHandler";
import { elasticSearchService } from "../../services/elastic-search";
import sendSuccessApiResponse from "../../utils/response/sendSuccessApiResponse";
import sendErrorApiResponse from "../../utils/response/sendErrorApiResponse";
export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await elasticSearchService.createIndexFromFile();

      return sendSuccessApiResponse({
        res,
        message: "content indexed successfully",
        data: {},
        status: "success",
      });
    } catch (error) {
      return sendErrorApiResponse({
        res,
        statusCode: 500,
        status: "error",
        message: `unexpected error - ${error}`,
      });
    }
  }
);
