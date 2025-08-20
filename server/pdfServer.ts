import { createServer } from "http";
import { storage } from "./storage";
import puppeteer from "puppeteer";
import { buildReportHtml } from "./reportTemplate";

export function startPdfServer(port: number = 3001) {
  const server = createServer(async (req, res) => {
    // Add CORS headers for cross-origin requests
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }
    
    if (req.url === '/report.pdf' && req.method === 'GET') {
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
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  });

  server.listen(port, 'localhost', () => {
    console.log(`PDF server running on http://localhost:${port}`);
  });

  return server;
}
