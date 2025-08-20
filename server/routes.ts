import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import puppeteer from "puppeteer";
import { buildReportHtml } from "./reportTemplate";

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

  // Generate PDF report
  app.get("/api/report.pdf", async (_req, res) => {
    try {
      const testSuite = await storage.getTestSuite();
      const testResults = await storage.getTestResults();
      if (!testSuite) {
        return res.status(404).json({ message: "Test suite not found" });
      }

      const html = buildReportHtml(testSuite, testResults, {});
      const browser = await puppeteer.launch({ args: ["--no-sandbox", "--font-render-hinting=none"] });
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: "networkidle0" });
      const pdf = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: { top: "24mm", right: "16mm", bottom: "24mm", left: "16mm" },
      });
      await browser.close();

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", 'attachment; filename="playwright-report.pdf"');
      res.send(pdf);
    } catch (error) {
      res.status(500).json({ message: "Failed to generate PDF" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
