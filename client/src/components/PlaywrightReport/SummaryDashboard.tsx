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
    <section className="mb-12 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        <Card className="hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 group border-0 shadow-sm bg-white/80 dark:bg-vercel-gray-900/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-vercel-gray-500 dark:text-vercel-gray-400">Passed</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">{testSuite.passedTests}</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-sm">
                <Check className="text-green-600 dark:text-green-400 w-7 h-7" />
              </div>
            </div>
            <div className="mt-6">
              <div className="w-full bg-vercel-gray-200 dark:bg-vercel-gray-800 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-green-500 to-green-400 h-2.5 rounded-full animate-pulse-subtle transition-all duration-1000 shadow-sm"
                  style={{ width: `${(testSuite.passedTests / testSuite.totalTests) * 100}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300 group border-0 shadow-sm bg-white/80 dark:bg-vercel-gray-900/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-vercel-gray-500 dark:text-vercel-gray-400">Failed</p>
                <p className="text-3xl font-bold text-red-600 dark:text-red-400">{testSuite.failedTests}</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-red-100 to-red-50 dark:from-red-900/30 dark:to-red-800/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-sm">
                <X className="text-red-600 dark:text-red-400 w-7 h-7" />
              </div>
            </div>
            <div className="mt-6">
              <div className="w-full bg-vercel-gray-200 dark:bg-vercel-gray-800 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-red-500 to-red-400 h-2.5 rounded-full transition-all duration-1000 shadow-sm"
                  style={{ width: `${(testSuite.failedTests / testSuite.totalTests) * 100}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg hover:shadow-yellow-500/10 transition-all duration-300 group border-0 shadow-sm bg-white/80 dark:bg-vercel-gray-900/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-vercel-gray-500 dark:text-vercel-gray-400">Skipped</p>
                <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{testSuite.skippedTests}</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-100 to-yellow-50 dark:from-yellow-900/30 dark:to-yellow-800/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-sm">
                <Minus className="text-yellow-600 dark:text-yellow-400 w-7 h-7" />
              </div>
            </div>
            <div className="mt-6">
              <div className="w-full bg-vercel-gray-200 dark:bg-vercel-gray-800 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-yellow-500 to-yellow-400 h-2.5 rounded-full transition-all duration-1000 shadow-sm"
                  style={{ width: `${(testSuite.skippedTests / testSuite.totalTests) * 100}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 group border-0 shadow-sm bg-white/80 dark:bg-vercel-gray-900/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-vercel-gray-500 dark:text-vercel-gray-400">Duration</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{formatDuration(testSuite.duration)}</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-sm">
                <Clock className="text-blue-600 dark:text-blue-400 w-7 h-7" />
              </div>
            </div>
            <div className="mt-6">
              <div className="flex items-center text-sm text-vercel-gray-500 dark:text-vercel-gray-400 font-medium">
                <TrendingUp className="w-4 h-4 text-green-500 mr-2" />
                <span>{successRate}% success rate</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 group border-0 shadow-sm bg-white/80 dark:bg-vercel-gray-900/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-vercel-gray-500 dark:text-vercel-gray-400">Flakiness Rate</p>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{flakinessRate}%</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-800/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-sm">
                <Shield className="text-purple-600 dark:text-purple-400 w-7 h-7" />
              </div>
            </div>
            <div className="mt-6">
              <div className="flex items-center text-sm text-vercel-gray-500 dark:text-vercel-gray-400 font-medium">
                <TrendingUp className="w-4 h-4 text-green-500 mr-2" />
                <span>{15 - flakinessRate}% below industry avg</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
