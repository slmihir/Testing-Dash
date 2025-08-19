import { Filter, TrendingUp, Clock, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterBarProps {
  totalTests: number;
  statusFilter: string;
  browserFilter: string;
  onStatusFilterChange: (status: string) => void;
  onBrowserFilterChange: (browser: string) => void;
}

export function FilterBar({
  totalTests,
  statusFilter,
  browserFilter,
  onStatusFilterChange,
  onBrowserFilterChange,
}: FilterBarProps) {
  return (
    <section className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-6 sm:space-y-0">
        <div className="flex items-center space-x-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-vercel-gray-900 to-vercel-gray-600 dark:from-white dark:to-vercel-gray-300 bg-clip-text text-transparent">Test Results</h2>
          <div className="flex items-center space-x-4">
            <span className="px-4 py-2 text-sm bg-vercel-gray-100/80 dark:bg-vercel-gray-800/80 text-vercel-gray-700 dark:text-vercel-gray-300 rounded-xl font-medium shadow-sm">
              {totalTests} tests
            </span>
            <span className="px-4 py-2 text-sm bg-gradient-to-r from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20 text-green-700 dark:text-green-300 rounded-xl flex items-center space-x-2 shadow-sm font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>AI-Optimized</span>
            </span>
            <span className="px-4 py-2 text-sm bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 text-blue-700 dark:text-blue-300 rounded-xl flex items-center space-x-2 shadow-sm font-medium">
              <Target className="w-3.5 h-3.5" />
              <span>&lt;10% Flaky</span>
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Select value={statusFilter} onValueChange={onStatusFilterChange}>
            <SelectTrigger className="w-40 h-11 bg-white/80 dark:bg-vercel-gray-900/80 border-vercel-gray-200/60 dark:border-vercel-gray-800/60 rounded-xl shadow-sm backdrop-blur-sm font-medium">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-0 shadow-lg">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="passed">Passed</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="skipped">Skipped</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={browserFilter} onValueChange={onBrowserFilterChange}>
            <SelectTrigger className="w-44 h-11 bg-white/80 dark:bg-vercel-gray-900/80 border-vercel-gray-200/60 dark:border-vercel-gray-800/60 rounded-xl shadow-sm backdrop-blur-sm font-medium">
              <SelectValue placeholder="All Browsers" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-0 shadow-lg">
              <SelectItem value="all">All Browsers</SelectItem>
              <SelectItem value="chromium">Chromium</SelectItem>
              <SelectItem value="firefox">Firefox</SelectItem>
              <SelectItem value="webkit">WebKit</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="h-11 px-6 bg-white/80 dark:bg-vercel-gray-900/80 hover:bg-vercel-gray-100 dark:hover:bg-vercel-gray-800 border-vercel-gray-200/60 dark:border-vercel-gray-800/60 rounded-xl shadow-sm backdrop-blur-sm font-medium transition-all duration-200">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>
      </div>
    </section>
  );
}
