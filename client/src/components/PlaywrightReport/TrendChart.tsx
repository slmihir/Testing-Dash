import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, TrendingUp, TrendingDown } from "lucide-react";

export function TrendChart() {
  const [timeRange, setTimeRange] = useState("7d");
  
  // Simulated historical data
  const generateTrendData = (days: number) => {
    return Array.from({ length: days }, (_, i) => ({
      date: new Date(Date.now() - (days - 1 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      }),
      passed: Math.floor(Math.random() * 20) + 15,
      failed: Math.floor(Math.random() * 5) + 1,
      duration: Math.floor(Math.random() * 30) + 45,
      successRate: Math.floor(Math.random() * 15) + 85,
    }));
  };

  const data = generateTrendData(timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90);
  const maxPassed = Math.max(...data.map(d => d.passed));
  const maxFailed = Math.max(...data.map(d => d.failed));
  const maxDuration = Math.max(...data.map(d => d.duration));

  const currentSuccessRate = data[data.length - 1]?.successRate || 0;
  const previousSuccessRate = data[data.length - 2]?.successRate || 0;
  const trend = currentSuccessRate - previousSuccessRate;

  return (
    <section className="mb-12 animate-fade-in">
      <Card className="bg-white/80 dark:bg-vercel-gray-900/80 backdrop-blur-sm shadow-sm border-0 rounded-2xl">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-vercel-gray-900 dark:text-vercel-gray-100 mb-2">
                Test Trends
              </h3>
              <p className="text-sm text-vercel-gray-600 dark:text-vercel-gray-400">
                Track your testing performance over time
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={timeRange === "7d" ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange("7d")}
                className="rounded-lg"
              >
                7D
              </Button>
              <Button
                variant={timeRange === "30d" ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange("30d")}
                className="rounded-lg"
              >
                30D
              </Button>
              <Button
                variant={timeRange === "90d" ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange("90d")}
                className="rounded-lg"
              >
                90D
              </Button>
            </div>
          </div>

          {/* Trend Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-green-50 to-green-25 dark:from-green-950/20 dark:to-green-900/10 rounded-xl p-4 border border-green-200/60 dark:border-green-800/60">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-green-700 dark:text-green-400">
                    {currentSuccessRate}%
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-500">Success Rate</div>
                </div>
                <div className={`flex items-center space-x-1 text-sm ${trend >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {trend >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span>{Math.abs(trend).toFixed(1)}%</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-25 dark:from-blue-950/20 dark:to-blue-900/10 rounded-xl p-4 border border-blue-200/60 dark:border-blue-800/60">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                    {data[data.length - 1]?.duration || 0}s
                  </div>
                  <div className="text-sm text-blue-600 dark:text-blue-500">Avg Duration</div>
                </div>
                <div className="flex items-center space-x-1 text-sm text-green-600 dark:text-green-400">
                  <TrendingDown className="w-4 h-4" />
                  <span>2.3s</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-25 dark:from-purple-950/20 dark:to-purple-900/10 rounded-xl p-4 border border-purple-200/60 dark:border-purple-800/60">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">
                    {data.reduce((sum, d) => sum + d.passed + d.failed, 0)}
                  </div>
                  <div className="text-sm text-purple-600 dark:text-purple-500">Total Tests</div>
                </div>
                <div className="flex items-center space-x-1 text-sm text-green-600 dark:text-green-400">
                  <TrendingUp className="w-4 h-4" />
                  <span>15%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chart Area */}
          <div className="relative h-80 bg-gradient-to-br from-vercel-gray-50/50 to-white/50 dark:from-vercel-gray-900/50 dark:to-vercel-gray-800/50 rounded-xl p-6 border border-vercel-gray-200/40 dark:border-vercel-gray-700/40">
            <div className="flex items-end justify-between h-full space-x-2">
              {data.map((point, index) => {
                const passedHeight = (point.passed / maxPassed) * 100;
                const failedHeight = (point.failed / maxFailed) * 100;
                
                return (
                  <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                    <div className="flex flex-col items-center space-y-1 h-full justify-end">
                      {/* Passed bar */}
                      <div
                        className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg transition-all duration-1000 ease-out min-h-[4px]"
                        style={{ 
                          height: `${passedHeight}%`,
                          animationDelay: `${index * 0.1}s`
                        }}
                      />
                      {/* Failed bar */}
                      <div
                        className="w-full bg-gradient-to-t from-red-500 to-red-400 rounded-b-lg transition-all duration-1000 ease-out min-h-[2px]"
                        style={{ 
                          height: `${failedHeight * 0.5}%`,
                          animationDelay: `${index * 0.1}s`
                        }}
                      />
                    </div>
                    <div className="text-xs text-vercel-gray-500 dark:text-vercel-gray-400 font-medium">
                      {point.date}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Legend */}
            <div className="absolute top-4 right-4 flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-xs font-medium text-vercel-gray-600 dark:text-vercel-gray-400">Passed</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span className="text-xs font-medium text-vercel-gray-600 dark:text-vercel-gray-400">Failed</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}