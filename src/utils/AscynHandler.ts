import type { Request, Response, NextFunction, RequestHandler } from "express";

const AsyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error: any) => {
      res.status(error?.statusCode || 500).json({
        success: false,
        message: error?.message || "INternal server Errror",
      });
    });
  };
};

export { AsyncHandler };
