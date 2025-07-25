import path from "path";
import { errorHandler, NotFoundHandler } from "./libs/utils/NotFoundHandler";

import express, {
  type Request,
  type Response,
  // type NextFunction,
} from "express";

const createApp = async (): Promise<express.Express> => {
  const app = express();

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Static assets
  const viewsPath = path.join(process.cwd(), "public", "views");
  app.use(express.static(viewsPath));

  // Routes
  app.get(["/", "/index", "/index.html"], (_req: Request, res: Response) => {
    res.type("html").sendFile(path.join(viewsPath, "index.html"));
  });

  app.get("/api/health", (_req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: "Server is healthy",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
    });
  });

  // Catch-all 404 handler
  app.use(NotFoundHandler);

  // Error handling middleware (must be last)
  app.use(errorHandler);

  return app;
};

// Ensure the promise is handled
const appPromise = createApp();

export default appPromise;
