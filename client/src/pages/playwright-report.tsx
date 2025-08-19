import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Play, ArrowUp, Zap, Clock, Shield } from "lucide-react";
import { Header } from "@/components/PlaywrightReport/Header";
import { SummaryDashboard } from "@/components/PlaywrightReport/SummaryDashboard";
import { FilterBar } from "@/components/PlaywrightReport/FilterBar";
import { TestResultCard } from "@/components/PlaywrightReport/TestResultCard";
import { ThemeProvider } from "@/components/PlaywrightReport/ThemeProvider";
import { Charts } from "@/components/PlaywrightReport/Charts";
import { TrendChart } from "@/components/PlaywrightReport/TrendChart";
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
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <SummaryDashboard testSuite={testSuite} />
          
          <Charts testSuite={testSuite} testResults={testResults || []} />
          
          <TrendChart />
          
          <FilterBar
            totalTests={filteredTests.length}
            statusFilter={statusFilter}
            browserFilter={browserFilter}
            onStatusFilterChange={setStatusFilter}
            onBrowserFilterChange={setBrowserFilter}
          />
          
          <section className="space-y-6">
            {displayedTests.map((test, index) => (
              <div
                key={test.id}
                style={{ animationDelay: `${index * 0.1}s` }}
                className="animate-slide-up"
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
            <div className="mt-12 text-center">
              <Button
                onClick={loadMore}
                variant="outline"
                className="h-12 px-8 bg-white/80 dark:bg-vercel-gray-900/80 border-vercel-gray-200/60 dark:border-vercel-gray-800/60 hover:shadow-lg transition-all duration-200 rounded-xl backdrop-blur-sm font-medium"
              >
                <ArrowUp className="w-4 h-4 mr-2 rotate-180" />
                Load More Tests
              </Button>
            </div>
          )}
        </main>

        {/* Floating Action Buttons */}
        <div className="fixed bottom-8 right-8 flex flex-col space-y-4">
          <Button
            size="icon"
            className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 backdrop-blur-sm"
          >
            <Play className="w-5 h-5" />
          </Button>
          <Button
            onClick={scrollToTop}
            size="icon"
            variant="secondary"
            className="w-14 h-14 bg-vercel-gray-800/90 dark:bg-vercel-gray-700/90 hover:bg-vercel-gray-900 dark:hover:bg-vercel-gray-600 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 backdrop-blur-sm"
          >
            <ArrowUp className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
}
