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
    <section className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-vercel-gray-900 dark:text-white">Test Results</h2>
          <span className="px-3 py-1 text-sm bg-vercel-gray-100 dark:bg-vercel-gray-800 text-vercel-gray-600 dark:text-vercel-gray-400 rounded-full">
            {totalTests} tests
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          <Select value={statusFilter} onValueChange={onStatusFilterChange}>
            <SelectTrigger className="w-32 bg-white dark:bg-vercel-gray-900 border-vercel-gray-200 dark:border-vercel-gray-800">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="passed">Passed</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="skipped">Skipped</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={browserFilter} onValueChange={onBrowserFilterChange}>
            <SelectTrigger className="w-36 bg-white dark:bg-vercel-gray-900 border-vercel-gray-200 dark:border-vercel-gray-800">
              <SelectValue placeholder="All Browsers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Browsers</SelectItem>
              <SelectItem value="chromium">Chromium</SelectItem>
              <SelectItem value="firefox">Firefox</SelectItem>
              <SelectItem value="webkit">WebKit</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="bg-vercel-gray-100 dark:bg-vercel-gray-800 hover:bg-vercel-gray-200 dark:hover:bg-vercel-gray-700">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>
      </div>
    </section>
  );
}
