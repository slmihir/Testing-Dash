import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const testResults = pgTable("test_results", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  status: text("status").notNull(), // 'passed', 'failed', 'skipped'
  duration: integer("duration").notNull(), // in milliseconds
  browser: text("browser").notNull(),
  viewport: text("viewport").notNull(),
  errorMessage: text("error_message"),
  errorStack: text("error_stack"),
  steps: jsonb("steps"), // Array of test steps
  attachments: jsonb("attachments"), // Array of attachment objects
  performance: jsonb("performance"), // Performance metrics
});

export const testSuites = pgTable("test_suites", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  totalTests: integer("total_tests").notNull(),
  passedTests: integer("passed_tests").notNull(),
  failedTests: integer("failed_tests").notNull(),
  skippedTests: integer("skipped_tests").notNull(),
  duration: integer("duration").notNull(),
  timestamp: text("timestamp").notNull(),
});

export const insertTestResultSchema = createInsertSchema(testResults).omit({
  id: true,
});

export const insertTestSuiteSchema = createInsertSchema(testSuites).omit({
  id: true,
});

export type InsertTestResult = z.infer<typeof insertTestResultSchema>;
export type TestResult = typeof testResults.$inferSelect;
export type InsertTestSuite = z.infer<typeof insertTestSuiteSchema>;
export type TestSuite = typeof testSuites.$inferSelect;

// Additional types for the UI
export type TestStep = {
  description: string;
  status: 'passed' | 'failed' | 'skipped';
};

export type TestAttachment = {
  name: string;
  type: 'image' | 'video' | 'text';
  path: string;
};

export type TestPerformance = {
  setup: number;
  execution: number;
};
