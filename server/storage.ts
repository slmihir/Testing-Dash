import { type TestResult, type TestSuite, type InsertTestResult, type InsertTestSuite } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getTestSuite(): Promise<TestSuite | undefined>;
  getTestResults(): Promise<TestResult[]>;
  createTestSuite(suite: InsertTestSuite): Promise<TestSuite>;
  createTestResult(result: InsertTestResult): Promise<TestResult>;
}

export class MemStorage implements IStorage {
  private testSuite: TestSuite | undefined;
  private testResults: Map<string, TestResult>;

  constructor() {
    this.testResults = new Map();
    this.initializeWithSampleData();
  }

  private initializeWithSampleData() {
    // Initialize with sample test suite
    this.testSuite = {
      id: randomUUID(),
      name: "Playwright Test Suite",
      totalTests: 267,
      passedTests: 247,
      failedTests: 12,
      skippedTests: 8,
      duration: 272000, // 4m 32s in milliseconds
      timestamp: new Date().toISOString(),
    };

    // Initialize with sample test results
    const sampleTests: Omit<TestResult, 'id'>[] = [
      {
        title: "User Authentication Flow",
        description: "tests/auth/login.spec.ts › User can log in with valid credentials",
        status: "passed",
        duration: 2400,
        browser: "Chromium",
        viewport: "Desktop",
        errorMessage: null,
        errorStack: null,
        steps: [
          { description: "Navigate to login page", status: "passed" },
          { description: "Enter valid credentials", status: "passed" },
          { description: "Verify dashboard redirect", status: "passed" }
        ],
        attachments: [
          { name: "screenshot.png", type: "image", path: "/screenshots/login-success.png" },
          { name: "test-video.webm", type: "video", path: "/videos/login-test.webm" }
        ],
        performance: { setup: 200, execution: 2200 }
      },
      {
        title: "Shopping Cart Functionality",
        description: "tests/ecommerce/cart.spec.ts › User can add items to cart",
        status: "failed",
        duration: 1800,
        browser: "Firefox",
        viewport: "Mobile",
        errorMessage: "AssertionError: Expected element to be visible",
        errorStack: `AssertionError: Expected element to be visible
  at tests/ecommerce/cart.spec.ts:23:5
  at Object.<anonymous> (cart.spec.ts:45:12)

Selector: [data-testid="add-to-cart-button"]
Actual: hidden
Expected: visible`,
        steps: [
          { description: "Navigate to product page", status: "passed" },
          { description: "Select product variant", status: "passed" },
          { description: "Click add to cart button", status: "failed" }
        ],
        attachments: [
          { name: "failure-screenshot.png", type: "image", path: "/screenshots/cart-failure.png" },
          { name: "console-logs.txt", type: "text", path: "/logs/console-errors.txt" }
        ],
        performance: { setup: 300, execution: 1500 }
      },
      {
        title: "Payment Integration",
        description: "tests/payment/stripe.spec.ts › Process payment with Stripe",
        status: "skipped",
        duration: 0,
        browser: "Chromium",
        viewport: "Desktop",
        errorMessage: null,
        errorStack: null,
        steps: [],
        attachments: [],
        performance: { setup: 0, execution: 0 }
      },
      {
        title: "User Profile Management",
        description: "tests/profile/update.spec.ts › User can update profile information",
        status: "passed",
        duration: 3200,
        browser: "WebKit",
        viewport: "Desktop",
        errorMessage: null,
        errorStack: null,
        steps: [
          { description: "Navigate to profile page", status: "passed" },
          { description: "Update user information", status: "passed" },
          { description: "Save changes", status: "passed" },
          { description: "Verify success message", status: "passed" }
        ],
        attachments: [
          { name: "profile-update.png", type: "image", path: "/screenshots/profile-update.png" }
        ],
        performance: { setup: 400, execution: 2800 }
      },
      {
        title: "Search Functionality",
        description: "tests/search/filters.spec.ts › User can filter search results",
        status: "passed",
        duration: 1900,
        browser: "Chromium",
        viewport: "Mobile",
        errorMessage: null,
        errorStack: null,
        steps: [
          { description: "Enter search query", status: "passed" },
          { description: "Apply filters", status: "passed" },
          { description: "Verify filtered results", status: "passed" }
        ],
        attachments: [
          { name: "search-results.png", type: "image", path: "/screenshots/search-results.png" }
        ],
        performance: { setup: 150, execution: 1750 }
      }
    ];

    sampleTests.forEach(test => {
      const id = randomUUID();
      this.testResults.set(id, { ...test, id });
    });
  }

  async getTestSuite(): Promise<TestSuite | undefined> {
    return this.testSuite;
  }

  async getTestResults(): Promise<TestResult[]> {
    return Array.from(this.testResults.values());
  }

  async createTestSuite(insertSuite: InsertTestSuite): Promise<TestSuite> {
    const id = randomUUID();
    const suite: TestSuite = { ...insertSuite, id };
    this.testSuite = suite;
    return suite;
  }

  async createTestResult(insertResult: InsertTestResult): Promise<TestResult> {
    const id = randomUUID();
    const result: TestResult = { ...insertResult, id };
    this.testResults.set(id, result);
    return result;
  }
}

export const storage = new MemStorage();
