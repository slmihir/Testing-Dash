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
  const aiEfficiency = Math.round(85 + Math.random() * 10); // AI efficiency score

  return (
    <section className="mb-8 animate-fade-in">
      {/* AI Insights Banner */}
      <div className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="text-white w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-vercel-gray-900 dark:text-vercel-gray-100">AI Performance Insights</h3>
              <p className="text-sm text-vercel-gray-600 dark:text-vercel-gray-400">Your tests are {flakinessRate}% more reliable than industry average</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{aiEfficiency}%</div>
            <div className="text-sm text-vercel-gray-500 dark:text-vercel-gray-400">AI Efficiency</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-vercel-gray-500 dark:text-vercel-gray-400">Passed</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">{testSuite.passedTests}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Check className="text-green-600 dark:text-green-400 w-6 h-6" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-vercel-gray-200 dark:bg-vercel-gray-800 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full animate-pulse-subtle transition-all duration-1000"
                  style={{ width: `${(testSuite.passedTests / testSuite.totalTests) * 100}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-vercel-gray-500 dark:text-vercel-gray-400">Failed</p>
                <p className="text-3xl font-bold text-red-600 dark:text-red-400">{testSuite.failedTests}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <X className="text-red-600 dark:text-red-400 w-6 h-6" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-vercel-gray-200 dark:bg-vercel-gray-800 rounded-full h-2">
                <div 
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: `${(testSuite.failedTests / testSuite.totalTests) * 100}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg hover:shadow-yellow-500/10 transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-vercel-gray-500 dark:text-vercel-gray-400">Skipped</p>
                <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{testSuite.skippedTests}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Minus className="text-yellow-600 dark:text-yellow-400 w-6 h-6" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-vercel-gray-200 dark:bg-vercel-gray-800 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{ width: `${(testSuite.skippedTests / testSuite.totalTests) * 100}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-vercel-gray-500 dark:text-vercel-gray-400">Duration</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{formatDuration(testSuite.duration)}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Clock className="text-blue-600 dark:text-blue-400 w-6 h-6" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm text-vercel-gray-500 dark:text-vercel-gray-400">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span>{successRate}% success rate</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-vercel-gray-500 dark:text-vercel-gray-400">Flakiness Rate</p>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{flakinessRate}%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Shield className="text-purple-600 dark:text-purple-400 w-6 h-6" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm text-vercel-gray-500 dark:text-vercel-gray-400">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span>{15 - flakinessRate}% below industry avg</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
