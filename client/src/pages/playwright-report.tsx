import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Play, ArrowUp, Zap, Clock, Shield } from "lucide-react";
import { Header } from "@/components/PlaywrightReport/Header";
import { SummaryDashboard } from "@/components/PlaywrightReport/SummaryDashboard";
import { FilterBar } from "@/components/PlaywrightReport/FilterBar";
import { TestResultCard } from "@/components/PlaywrightReport/TestResultCard";
import { ThemeProvider } from "@/components/PlaywrightReport/ThemeProvider";
import { Button } from "@/components/ui/button";
import { TestResult, TestSuite } from "@shared/schema";

export default function PlaywrightReport() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [browserFilter, setBrowserFilter] = useState("all");
  const [visibleTests, setVisibleTests] = useState(10);

  const { data: testSuite, isLoading: isSuiteLoading } = useQuery<TestSuite>({
    queryKey: ['/api/test-suite'],
  });

  const { data: testResults, isLoading: isResultsLoading } = useQuery<TestResult[]>({
    queryKey: ['/api/test-results'],
  });

  const filteredTests = useMemo(() => {
    if (!testResults) return [];
    
    return testResults.filter(test => {
      const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           test.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || test.status === statusFilter;
      const matchesBrowser = browserFilter === 'all' || test.browser.toLowerCase() === browserFilter.toLowerCase();
      
      return matchesSearch && matchesStatus && matchesBrowser;
    });
  }, [testResults, searchQuery, statusFilter, browserFilter]);

  const displayedTests = filteredTests.slice(0, visibleTests);

  const loadMore = () => {
    setVisibleTests(prev => Math.min(prev + 10, filteredTests.length));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isSuiteLoading || isResultsLoading) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-vercel-gray-50 dark:bg-vercel-gray-950">
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (!testSuite || !testResults) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-vercel-gray-50 dark:bg-vercel-gray-950">
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-vercel-gray-900 dark:text-vercel-gray-100 mb-2">
                No Test Data Available
              </h1>
              <p className="text-vercel-gray-600 dark:text-vercel-gray-400">
                Please run your Playwright tests to generate a report.
              </p>
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-vercel-gray-50 dark:bg-vercel-gray-950 text-vercel-gray-900 dark:text-vercel-gray-100 transition-colors duration-300">
        <Header onSearch={setSearchQuery} searchQuery={searchQuery} />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Business Value Banner */}
          <div className="mb-8 bg-gradient-to-r from-indigo-50 via-blue-50 to-cyan-50 dark:from-indigo-950/20 dark:via-blue-950/20 dark:to-cyan-950/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-vercel-gray-900 dark:text-vercel-gray-100 mb-2">
                AI-Native Testing Performance
              </h2>
              <p className="text-vercel-gray-600 dark:text-vercel-gray-400">
                Your tests were automatically generated and optimized using our AI platform
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Zap className="text-white w-8 h-8" />
                </div>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">25x</div>
                <div className="text-sm text-vercel-gray-600 dark:text-vercel-gray-400">Faster than traditional setup</div>
                <div className="text-xs text-vercel-gray-500 dark:text-vercel-gray-500 mt-1">Industry: 3-6 months → Our Platform: &lt;7 days</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Clock className="text-white w-8 h-8" />
                </div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">90%</div>
                <div className="text-sm text-vercel-gray-600 dark:text-vercel-gray-400">Less maintenance overhead</div>
                <div className="text-xs text-vercel-gray-500 dark:text-vercel-gray-500 mt-1">Self-healing capabilities reduce manual work</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Shield className="text-white w-8 h-8" />
                </div>
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">&lt;10%</div>
                <div className="text-sm text-vercel-gray-600 dark:text-vercel-gray-400">Test flakiness rate</div>
                <div className="text-xs text-vercel-gray-500 dark:text-vercel-gray-500 mt-1">Industry average: 15% flakiness</div>
              </div>
            </div>
          </div>

          <SummaryDashboard testSuite={testSuite} />
          
          <FilterBar
            totalTests={filteredTests.length}
            statusFilter={statusFilter}
            browserFilter={browserFilter}
            onStatusFilterChange={setStatusFilter}
            onBrowserFilterChange={setBrowserFilter}
          />
          
          <section className="space-y-4">
            {displayedTests.map((test, index) => (
              <div
                key={test.id}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <TestResultCard test={test} />
              </div>
            ))}
          </section>

          {displayedTests.length === 0 && (
            <div className="text-center py-12">
              <div className="text-vercel-gray-400 mb-4">
                <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
              </div>
              <h3 className="text-lg font-semibold text-vercel-gray-900 dark:text-vercel-gray-100 mb-2">
                No tests match your filters
              </h3>
              <p className="text-vercel-gray-600 dark:text-vercel-gray-400">
                Try adjusting your search criteria or filters to see more results.
              </p>
            </div>
          )}

          {visibleTests < filteredTests.length && (
            <div className="mt-8 text-center">
              <Button
                onClick={loadMore}
                variant="outline"
                className="bg-white dark:bg-vercel-gray-900 border-vercel-gray-200 dark:border-vercel-gray-800 hover:shadow-md transition-all duration-200"
              >
                <ArrowUp className="w-4 h-4 mr-2 rotate-180" />
                Load More Tests
              </Button>
            </div>
          )}
        </main>

        {/* Floating Action Buttons */}
        <div className="fixed bottom-6 right-6 flex flex-col space-y-3">
          <Button
            size="icon"
            className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Play className="w-4 h-4" />
          </Button>
          <Button
            onClick={scrollToTop}
            size="icon"
            variant="secondary"
            className="w-12 h-12 bg-vercel-gray-800 dark:bg-vercel-gray-700 hover:bg-vercel-gray-900 dark:hover:bg-vercel-gray-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <ArrowUp className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
}
