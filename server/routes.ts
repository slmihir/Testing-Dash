import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import puppeteer from "puppeteer";
import { buildReportHtml } from "./reportTemplate";

export async function registerRoutes(app: Express): Promise<Server> {
  // Simple login endpoint (demo only)
  app.post("/api/login", async (req, res) => {
    try {
      const { email, password } = req.body || {};
      if (email === "seedling@test.com" && password === "12345") {
        return res.json({ success: true });
      }
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Login failed" });
    }
  });

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
  
  // Handle PDF endpoint with a completely separate handler
  const originalListener = httpServer.listeners('request')[0];
  httpServer.removeAllListeners('request');
  
  httpServer.on('request', async (req, res) => {
    if (req.url === '/api/report.pdf' && req.method === 'GET') {
      try {
        const testSuite = await storage.getTestSuite();
        const testResults = await storage.getTestResults();
        if (!testSuite) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: "Test suite not found" }));
          return;
        }

        const html = buildReportHtml(testSuite, testResults, {});
        const browser = await puppeteer.launch({ args: ["--no-sandbox", "--font-render-hinting=none"] });
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: "load", timeout: 15000 });
        await new Promise(resolve => setTimeout(resolve, 1000));
        const pdf = await page.pdf({
          format: "A4",
          printBackground: true,
          margin: { top: "24mm", right: "16mm", bottom: "24mm", left: "16mm" },
        });
        await browser.close();

        console.log("PDF generated, size:", pdf.length, "bytes");
        if (pdf.length < 1000) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: "PDF generation failed or is empty" }));
          return;
        }

        // Convert Uint8Array to Buffer and send
        const buffer = Buffer.from(pdf);
        res.writeHead(200, {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="playwright-report.pdf"',
          'Content-Length': buffer.length,
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0'
        });
        
        res.end(buffer);
      } catch (error) {
        console.error("PDF generation error:", error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "Failed to generate PDF" }));
      }
    } else {
      // Pass all other requests to Express
      originalListener(req, res);
    }
  });

  return httpServer;
}
