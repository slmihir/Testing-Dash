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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center space-x-4">
          <h2 className="text-base font-semibold tracking-[-0.01em] text-vercel-gray-900 dark:text-white">Test results</h2>
          <span className="px-2.5 py-1 text-xs bg-white dark:bg-vercel-gray-900 text-vercel-gray-600 dark:text-vercel-gray-400 rounded-full ring-1 ring-inset ring-vercel-gray-200 dark:ring-vercel-gray-800">
            {totalTests} tests
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={statusFilter} onValueChange={onStatusFilterChange}>
            <SelectTrigger className="w-32 bg-white dark:bg-vercel-gray-900 border-vercel-gray-200 dark:border-vercel-gray-800 focus:ring-0 focus:ring-offset-0">
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
            <SelectTrigger className="w-36 bg-white dark:bg-vercel-gray-900 border-vercel-gray-200 dark:border-vercel-gray-800 focus:ring-0 focus:ring-offset-0">
              <SelectValue placeholder="All Browsers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Browsers</SelectItem>
              <SelectItem value="chromium">Chromium</SelectItem>
              <SelectItem value="firefox">Firefox</SelectItem>
              <SelectItem value="webkit">WebKit</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="bg-white dark:bg-vercel-gray-900 hover:bg-vercel-gray-50 dark:hover:bg-vercel-gray-800 border-vercel-gray-200 dark:border-vercel-gray-800">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>
      </div>
    </section>
  );
}
