import { Check, X, Minus, Clock, TrendingUp, Brain, Shield, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { TestSuite } from "@shared/schema";

interface SummaryDashboardProps {
  testSuite: TestSuite;
}

export function SummaryDashboard({ testSuite }: SummaryDashboardProps) {
  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  const successRate = Math.round((testSuite.passedTests / testSuite.totalTests) * 100);
  const flakinessRate = Math.max(0, 10 - Math.round(Math.random() * 3)); // Simulated flakiness rate <10%

  return (
    <section className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <Card className="border-vercel-gray-200/60 dark:border-vercel-gray-800/60 hover:shadow-sm transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-vercel-gray-500 dark:text-vercel-gray-400">Passed</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{testSuite.passedTests}</p>
              </div>
              <div className="w-10 h-10 bg-green-50 dark:bg-green-900/20 rounded-md flex items-center justify-center ring-1 ring-inset ring-green-200/60 dark:ring-green-800/60">
                <Check className="text-green-600 dark:text-green-400 w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-vercel-gray-200 dark:bg-vercel-gray-800 rounded-full h-1.5">
                <div 
                  className="bg-green-500 h-1.5 rounded-full transition-all duration-1000"
                  style={{ width: `${(testSuite.passedTests / testSuite.totalTests) * 100}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-vercel-gray-200/60 dark:border-vercel-gray-800/60 hover:shadow-sm transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-vercel-gray-500 dark:text-vercel-gray-400">Failed</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">{testSuite.failedTests}</p>
              </div>
              <div className="w-10 h-10 bg-red-50 dark:bg-red-900/20 rounded-md flex items-center justify-center ring-1 ring-inset ring-red-200/60 dark:ring-red-800/60">
                <X className="text-red-600 dark:text-red-400 w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-vercel-gray-200 dark:bg-vercel-gray-800 rounded-full h-1.5">
                <div 
                  className="bg-red-500 h-1.5 rounded-full transition-all duration-1000"
                  style={{ width: `${(testSuite.failedTests / testSuite.totalTests) * 100}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-vercel-gray-200/60 dark:border-vercel-gray-800/60 hover:shadow-sm transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-vercel-gray-500 dark:text-vercel-gray-400">Skipped</p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{testSuite.skippedTests}</p>
              </div>
              <div className="w-10 h-10 bg-yellow-50 dark:bg-yellow-900/20 rounded-md flex items-center justify-center ring-1 ring-inset ring-yellow-200/60 dark:ring-yellow-800/60">
                <Minus className="text-yellow-600 dark:text-yellow-400 w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-vercel-gray-200 dark:bg-vercel-gray-800 rounded-full h-1.5">
                <div 
                  className="bg-yellow-500 h-1.5 rounded-full transition-all duration-1000"
                  style={{ width: `${(testSuite.skippedTests / testSuite.totalTests) * 100}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-vercel-gray-200/60 dark:border-vercel-gray-800/60 hover:shadow-sm transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-vercel-gray-500 dark:text-vercel-gray-400">Duration</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{formatDuration(testSuite.duration)}</p>
              </div>
              <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-md flex items-center justify-center ring-1 ring-inset ring-blue-200/60 dark:ring-blue-800/60">
                <Clock className="text-blue-600 dark:text-blue-400 w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-xs text-vercel-gray-500 dark:text-vercel-gray-400">
                <TrendingUp className="w-3.5 h-3.5 text-green-600 dark:text-green-400 mr-1" />
                <span className="tabular-nums">{successRate}% success rate</span>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </section>
  );
}
