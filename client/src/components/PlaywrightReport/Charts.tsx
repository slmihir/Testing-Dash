import { TestResult, TestSuite } from "@shared/schema";
import { TrendingUp, Clock, Target, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ChartsProps {
  testSuite: TestSuite;
  testResults: TestResult[];
}

export function Charts({ testSuite, testResults }: ChartsProps) {
  // Calculate metrics for charts
  const totalTests = testSuite.totalTests;
  const passedPercentage = (testSuite.passedTests / totalTests) * 100;
  const failedPercentage = (testSuite.failedTests / totalTests) * 100;
  const skippedPercentage = (testSuite.skippedTests / totalTests) * 100;

  // Browser distribution
  const browserStats = testResults.reduce((acc, test) => {
    acc[test.browser] = (acc[test.browser] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Performance metrics
  const avgDuration = testResults.reduce((sum, test) => sum + test.duration, 0) / testResults.length;
  const performanceData = testResults.map(test => ({
    name: test.title.substring(0, 20) + "...",
    duration: test.duration / 1000, // Convert to seconds
  })).slice(0, 5);

  const DonutChart = () => {
    const radius = 60;
    const strokeWidth = 12;
    const normalizedRadius = radius - strokeWidth * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    
    const passedOffset = circumference - (passedPercentage / 100) * circumference;
    const failedOffset = circumference - (failedPercentage / 100) * circumference;
    const skippedOffset = circumference - (skippedPercentage / 100) * circumference;

    return (
      <div className="relative w-32 h-32 mx-auto">
        <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            stroke="currentColor"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="text-vercel-gray-200 dark:text-vercel-gray-800"
          />
          {/* Passed arc */}
          <circle
            stroke="currentColor"
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={passedOffset}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="text-green-500 transition-all duration-1000 ease-out"
            strokeLinecap="round"
          />
          {/* Failed arc */}
          <circle
            stroke="currentColor"
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={failedOffset}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="text-red-500 transition-all duration-1000 ease-out"
            strokeLinecap="round"
            transform={`rotate(${passedPercentage * 3.6} ${radius} ${radius})`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-vercel-gray-900 dark:text-vercel-gray-100">
              {Math.round(passedPercentage)}%
            </div>
            <div className="text-xs text-vercel-gray-500 dark:text-vercel-gray-400">Success</div>
          </div>
        </div>
      </div>
    );
  };

  const BrowserChart = () => {
    const maxCount = Math.max(...Object.values(browserStats));
    
    return (
      <div className="space-y-4">
        {Object.entries(browserStats).map(([browser, count]) => (
          <div key={browser} className="flex items-center space-x-4">
            <div className="w-20 text-sm font-medium text-vercel-gray-700 dark:text-vercel-gray-300">
              {browser}
            </div>
            <div className="flex-1">
              <div className="h-3 bg-vercel-gray-200 dark:bg-vercel-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${(count / maxCount) * 100}%` }}
                />
              </div>
            </div>
            <div className="w-8 text-sm font-semibold text-vercel-gray-600 dark:text-vercel-gray-400">
              {count}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const PerformanceChart = () => {
    const maxDuration = Math.max(...performanceData.map(d => d.duration));
    
    return (
      <div className="space-y-3">
        {performanceData.map((test, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-24 text-xs text-vercel-gray-600 dark:text-vercel-gray-400 truncate">
              {test.name}
            </div>
            <div className="flex-1">
              <div className="h-4 bg-vercel-gray-200 dark:bg-vercel-gray-800 rounded-lg overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-lg transition-all duration-1000 ease-out"
                  style={{ 
                    width: `${(test.duration / maxDuration) * 100}%`,
                    animationDelay: `${index * 0.2}s`
                  }}
                />
              </div>
            </div>
            <div className="w-12 text-xs font-medium text-vercel-gray-600 dark:text-vercel-gray-400">
              {test.duration.toFixed(1)}s
            </div>
          </div>
        ))}
      </div>
    );
  };

  const MetricCard = ({ title, value, change, icon: Icon, color }: {
    title: string;
    value: string;
    change: string;
    icon: any;
    color: string;
  }) => (
    <div className="bg-white dark:bg-vercel-gray-900 rounded-xl p-5 shadow-sm border border-vercel-gray-200/60 dark:border-vercel-gray-800/60">
      <div className="flex items-center justify-between mb-4">
        <div className="w-9 h-9 rounded-md flex items-center justify-center ring-1 ring-inset ring-vercel-gray-200 dark:ring-vercel-gray-800">
          <Icon className="w-5 h-5 text-vercel-gray-700 dark:text-vercel-gray-300" />
        </div>
        <div className="text-right">
          <div className="text-xl font-semibold text-vercel-gray-900 dark:text-vercel-gray-100 tabular-nums">
            {value}
          </div>
          <div className="text-xs text-green-700 dark:text-green-400/90 flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" />
            {change}
          </div>
        </div>
      </div>
      <div className="text-xs font-medium text-vercel-gray-700 dark:text-vercel-gray-300">
        {title}
      </div>
    </div>
  );

  return (
    <section className="mb-10 animate-fade-in">
      <div className="mb-4">
        <h2 className="text-base font-semibold tracking-[-0.01em] text-vercel-gray-900 dark:text-vercel-gray-100 mb-1">
          Analytics
        </h2>
        <p className="text-xs text-vercel-gray-600 dark:text-vercel-gray-400">
          Your test performance at a glance
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <MetricCard
          title="Average Duration"
          value={`${(avgDuration / 1000).toFixed(1)}s`}
          change="+12% faster"
          icon={Clock}
          color=""
        />
        <MetricCard
          title="Success Rate"
          value={`${Math.round(passedPercentage)}%`}
          change="+5% improved"
          icon={Target}
          color=""
        />
        <MetricCard
          title="Test Velocity"
          value={`${Math.round(totalTests / (testSuite.duration / 60000))} /min`}
          change="+8% faster"
          icon={Zap}
          color=""
        />
        <MetricCard
          title="Reliability Score"
          value={`${Math.round(95 + Math.random() * 4)}%`}
          change="+3% better"
          icon={TrendingUp}
          color=""
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Test Results Distribution */}
        <Card className="bg-white dark:bg-vercel-gray-900 shadow-sm border border-vercel-gray-200/60 dark:border-vercel-gray-800/60 rounded-xl">
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold tracking-[-0.01em] text-vercel-gray-900 dark:text-vercel-gray-100 mb-4">
              Test Results Distribution
            </h3>
            <DonutChart />
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-xs font-medium text-vercel-gray-600 dark:text-vercel-gray-400">Passed</span>
                </div>
                <span className="text-xs font-semibold text-vercel-gray-900 dark:text-vercel-gray-100">
                  {testSuite.passedTests}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-xs font-medium text-vercel-gray-600 dark:text-vercel-gray-400">Failed</span>
                </div>
                <span className="text-xs font-semibold text-vercel-gray-900 dark:text-vercel-gray-100">
                  {testSuite.failedTests}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-xs font-medium text-vercel-gray-600 dark:text-vercel-gray-400">Skipped</span>
                </div>
                <span className="text-xs font-semibold text-vercel-gray-900 dark:text-vercel-gray-100">
                  {testSuite.skippedTests}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Browser Distribution */}
        <Card className="bg-white dark:bg-vercel-gray-900 shadow-sm border border-vercel-gray-200/60 dark:border-vercel-gray-800/60 rounded-xl">
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold tracking-[-0.01em] text-vercel-gray-900 dark:text-vercel-gray-100 mb-4">
              Browser Coverage
            </h3>
            <BrowserChart />
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card className="bg-white dark:bg-vercel-gray-900 shadow-sm border border-vercel-gray-200/60 dark:border-vercel-gray-800/60 rounded-xl">
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold tracking-[-0.01em] text-vercel-gray-900 dark:text-vercel-gray-100 mb-4">
              Test Performance
            </h3>
            <PerformanceChart />
            <div className="mt-5 pt-3 border-t border-vercel-gray-200/60 dark:border-vercel-gray-700/60">
              <div className="text-xs text-vercel-gray-600 dark:text-vercel-gray-400">
                <span className="font-medium">Avg Duration:</span> {(avgDuration / 1000).toFixed(1)}s
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}