import type { TestResult, TestSuite } from "@shared/schema";

type PdfOptions = {
  title?: string;
  generatedAt?: string;
};

export function buildReportHtml(
  suite: TestSuite,
  results: TestResult[],
  opts: PdfOptions = {}
): string {
  const title = opts.title || "Playwright Test Report";
  const generatedAt = opts.generatedAt || new Date().toLocaleString();

  const statusBadge = (status: string) => {
    const base = "display:inline-block;padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:600;line-height:1;";
    switch (status) {
      case "passed":
        return `${base}background:#E7F6EC;color:#166534;border:1px solid #BBE5C7`;
      case "failed":
        return `${base}background:#FDE8E8;color:#991B1B;border:1px solid #F5C2C2`;
      case "skipped":
        return `${base}background:#FEF7CD;color:#854D0E;border:1px solid #F5E6A7`;
      default:
        return `${base}background:#F3F4F6;color:#374151;border:1px solid #E5E7EB`;
    }
  };

  const rows = results
    .map(
      (r) => `
      <tr>
        <td>${escapeHtml(r.title)}</td>
        <td><span style="${statusBadge(r.status)}">${r.status.toUpperCase()}</span></td>
        <td>${(r.duration / 1000).toFixed(1)}s</td>
        <td>${escapeHtml(r.browser)}</td>
        <td>${escapeHtml(r.viewport)}</td>
        <td>${r.errorMessage ? escapeHtml(r.errorMessage) : ""}</td>
      </tr>
    `
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
    <style>
      @page { size: A4; margin: 24mm 16mm; }
      body { font-family: -apple-system, BlinkMacSystemFont, "Inter", Segoe UI, Roboto, Helvetica, Arial, sans-serif; color: #111827; }
      .muted { color: #6B7280; }
      .h1 { font-size: 20px; font-weight: 700; margin: 0; }
      .h2 { font-size: 14px; font-weight: 600; margin: 0 0 8px; }
      .section { margin: 18px 0; }
      .card { border: 1px solid #E5E7EB; border-radius: 8px; padding: 12px; }
      .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
      .kpi { display:flex; justify-content: space-between; align-items:center; }
      .kpi .label { font-size: 11px; color: #6B7280; }
      .kpi .value { font-size: 18px; font-weight: 700; }
      table { width:100%; border-collapse: collapse; }
      th, td { text-align:left; padding: 8px 10px; border-bottom: 1px solid #E5E7EB; font-size: 12px; vertical-align: top; }
      th { font-size: 11px; color:#374151; letter-spacing: .01em; }
      .header { display:flex; justify-content: space-between; align-items: baseline; margin-bottom: 12px; }
      .small { font-size: 11px; }
    </style>
  </head>
  <body>
    <div class="header">
      <div>
        <div class="h1">${escapeHtml(title)}</div>
        <div class="small muted">Generated: ${escapeHtml(generatedAt)}</div>
      </div>
      <div class="small muted">Duration: ${formatDuration(suite.duration)}</div>
    </div>

    <div class="section">
      <div class="grid">
        <div class="card kpi">
          <div>
            <div class="label">Total</div>
            <div class="value">${suite.totalTests}</div>
          </div>
        </div>
        <div class="card kpi">
          <div>
            <div class="label">Passed</div>
            <div class="value" style="color:#16A34A">${suite.passedTests}</div>
          </div>
        </div>
        <div class="card kpi">
          <div>
            <div class="label">Failed</div>
            <div class="value" style="color:#DC2626">${suite.failedTests}</div>
          </div>
        </div>
        <div class="card kpi">
          <div>
            <div class="label">Skipped</div>
            <div class="value" style="color:#CA8A04">${suite.skippedTests}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="h2">Test Results</div>
      <table>
        <thead>
          <tr>
            <th style="width:30%">Title</th>
            <th>Status</th>
            <th>Duration</th>
            <th>Browser</th>
            <th>Viewport</th>
            <th style="width:35%">Error</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  </body>
 </html>`;
}

function escapeHtml(str: string) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatDuration(ms: number) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}m ${seconds}s`;
}
