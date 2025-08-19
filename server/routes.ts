import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get test suite summary
  app.get("/api/test-suite", async (_req, res) => {
    try {
      const testSuite = await storage.getTestSuite();
      if (!testSuite) {
        return res.status(404).json({ message: "Test suite not found" });
      }
      res.json(testSuite);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch test suite" });
    }
  });

  // Get all test results
  app.get("/api/test-results", async (_req, res) => {
    try {
      const testResults = await storage.getTestResults();
      res.json(testResults);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch test results" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
