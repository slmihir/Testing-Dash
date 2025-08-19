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
      name: "AI-Generated E-commerce Test Suite",
      totalTests: 7,
      passedTests: 5,
      failedTests: 1,
      skippedTests: 1,
      duration: 89000, // 1m 29s in milliseconds
      timestamp: new Date().toISOString(),
    };

    // Initialize with sample test results - AI-generated business scenarios
    const sampleTests: Omit<TestResult, 'id'>[] = [
      {
        title: "Customer Login Journey",
        description: "🤖 AI-Generated from: 'Customers should be able to sign in and access their account dashboard'",
        status: "passed",
        duration: 2400,
        browser: "Chromium",
        viewport: "Desktop (1920x1080)",
        errorMessage: null,
        errorStack: null,
        steps: [
          { description: "Navigate to login page (/login)", status: "passed" },
          { description: "Enter customer email (test@example.com)", status: "passed" },
          { description: "Enter password securely", status: "passed" },
          { description: "Click 'Sign In' button", status: "passed" },
          { description: "Verify redirect to dashboard (/dashboard)", status: "passed" },
          { description: "Confirm user profile displays correctly", status: "passed" }
        ],
        attachments: [
          { name: "login-success.png", type: "image", path: "/screenshots/login-success.png" },
          { name: "login-flow.webm", type: "video", path: "/videos/login-flow.webm" }
        ],
        performance: { setup: 200, execution: 2200 }
      },
      {
        title: "Product Purchase Flow",
        description: "🤖 AI-Generated from: 'Users should be able to browse products, add items to cart, and complete checkout'",
        status: "failed",
        duration: 1800,
        browser: "Firefox",
        viewport: "Mobile (375x667)",
        errorMessage: "Timeout: Element not visible within 5 seconds - AI detected dynamic loading issue",
        errorStack: `TimeoutError: Element [data-testid="add-to-cart-btn"] not visible
  at ai-generated/product-purchase.spec.ts:34:8
  at waitForElement (ai-utils.ts:12:5)

🤖 AI Analysis: Mobile viewport detected slower DOM rendering
💡 Self-healing: Increasing wait timeout from 5s to 8s for mobile devices`,
        steps: [
          { description: "Navigate to product catalog (/products)", status: "passed" },
          { description: "Filter by category: Electronics", status: "passed" },
          { description: "Select product: iPhone 15", status: "passed" },
          { description: "Choose variant: 128GB Blue", status: "passed" },
          { description: "Add to cart (mobile viewport)", status: "failed" },
          { description: "Navigate to checkout", status: "skipped" }
        ],
        attachments: [
          { name: "mobile-cart-failure.png", type: "image", path: "/screenshots/mobile-cart-failure.png" },
          { name: "ai-analysis.txt", type: "text", path: "/logs/ai-analysis.txt" },
          { name: "network-timing.json", type: "text", path: "/logs/network-timing.json" }
        ],
        performance: { setup: 300, execution: 1500 }
      },
      {
        title: "Customer Support Chat",
        description: "🤖 AI-Generated from: 'Customers should be able to contact support through live chat'",
        status: "skipped",
        duration: 0,
        browser: "Chromium",
        viewport: "Desktop (1920x1080)",
        errorMessage: null,
        errorStack: null,
        steps: [
          { description: "🚫 Skipped: Chat widget requires API key configuration", status: "skipped" }
        ],
        attachments: [],
        performance: { setup: 0, execution: 0 }
      },
      {
        title: "Account Settings Update",
        description: "🤖 AI-Generated from: 'Users should be able to update their profile information and preferences'",
        status: "passed",
        duration: 3200,
        browser: "WebKit",
        viewport: "Desktop (1920x1080)",
        errorMessage: null,
        errorStack: null,
        steps: [
          { description: "Navigate to account settings (/account)", status: "passed" },
          { description: "Update display name to 'John Smith'", status: "passed" },
          { description: "Change email preferences", status: "passed" },
          { description: "Upload new profile photo", status: "passed" },
          { description: "Save all changes", status: "passed" },
          { description: "Verify success notification appears", status: "passed" },
          { description: "Confirm changes persist after page refresh", status: "passed" }
        ],
        attachments: [
          { name: "profile-update-success.png", type: "image", path: "/screenshots/profile-update-success.png" },
          { name: "settings-validation.png", type: "image", path: "/screenshots/settings-validation.png" }
        ],
        performance: { setup: 400, execution: 2800 }
      },
      {
        title: "Product Search & Discovery",
        description: "🤖 AI-Generated from: 'Customers should find products easily using search and filters'",
        status: "passed",
        duration: 1900,
        browser: "Chromium",
        viewport: "Mobile (375x667)",
        errorMessage: null,
        errorStack: null,
        steps: [
          { description: "Open search interface", status: "passed" },
          { description: "Enter search term: 'wireless headphones'", status: "passed" },
          { description: "Apply price filter: $50-$200", status: "passed" },
          { description: "Apply brand filter: Sony, Bose", status: "passed" },
          { description: "Verify 12 relevant results displayed", status: "passed" },
          { description: "Sort by customer rating (highest first)", status: "passed" },
          { description: "Confirm search results are relevant", status: "passed" }
        ],
        attachments: [
          { name: "search-results-mobile.png", type: "image", path: "/screenshots/search-results-mobile.png" },
          { name: "filter-applied.png", type: "image", path: "/screenshots/filter-applied.png" }
        ],
        performance: { setup: 150, execution: 1750 }
      }
    ];

    // Add more AI-generated test scenarios
    const additionalTests: Omit<TestResult, 'id'>[] = [
      {
        title: "Newsletter Subscription",
        description: "🤖 AI-Generated from: 'Visitors should be able to subscribe to our newsletter'",
        status: "passed",
        duration: 1200,
        browser: "Chromium",
        viewport: "Desktop (1920x1080)",
        errorMessage: null,
        errorStack: null,
        steps: [
          { description: "Scroll to newsletter section", status: "passed" },
          { description: "Enter email: test@example.com", status: "passed" },
          { description: "Click 'Subscribe' button", status: "passed" },
          { description: "Verify success message", status: "passed" }
        ],
        attachments: [
          { name: "newsletter-success.png", type: "image", path: "/screenshots/newsletter-success.png" }
        ],
        performance: { setup: 100, execution: 1100 }
      },
      {
        title: "Guest Checkout Process",
        description: "🤖 AI-Generated from: 'Customers should be able to purchase without creating an account'",
        status: "passed",
        duration: 4200,
        browser: "Firefox",
        viewport: "Desktop (1920x1080)",
        errorMessage: null,
        errorStack: null,
        steps: [
          { description: "Add product to cart", status: "passed" },
          { description: "Proceed to checkout", status: "passed" },
          { description: "Select 'Guest Checkout'", status: "passed" },
          { description: "Enter shipping information", status: "passed" },
          { description: "Select payment method", status: "passed" },
          { description: "Review order summary", status: "passed" },
          { description: "Complete purchase", status: "passed" }
        ],
        attachments: [
          { name: "guest-checkout-flow.png", type: "image", path: "/screenshots/guest-checkout.png" },
          { name: "order-confirmation.png", type: "image", path: "/screenshots/order-confirmation.png" }
        ],
        performance: { setup: 200, execution: 4000 }
      }
    ];

    // Combine all test scenarios
    const allTests = [...sampleTests, ...additionalTests];

    allTests.forEach(test => {
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
    const result: TestResult = { 
      ...insertResult, 
      id,
      errorMessage: insertResult.errorMessage ?? null,
      errorStack: insertResult.errorStack ?? null,
      steps: insertResult.steps ?? null,
      attachments: insertResult.attachments ?? null,
      performance: insertResult.performance ?? null,
    };
    this.testResults.set(id, result);
    return result;
  }
}

export const storage = new MemStorage();
