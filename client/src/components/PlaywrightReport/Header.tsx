import { Search, Moon, Sun, Download, FlaskConical, Sparkles, BarChart3 } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

export function Header({ onSearch, searchQuery }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-vercel-gray-900/80 backdrop-blur-md border-b border-vercel-gray-200 dark:border-vercel-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <FlaskConical className="text-white w-4 h-4" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">AI-Native Test Results</h1>
                <p className="text-xs text-vercel-gray-500 dark:text-vercel-gray-400">Testing-as-a-Service Platform</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Input
                type="text"
                placeholder="Search tests..."
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                className="w-64 pl-10 bg-vercel-gray-100 dark:bg-vercel-gray-800 border-vercel-gray-200 dark:border-vercel-gray-700 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-vercel-gray-400 w-4 h-4" />
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-lg bg-vercel-gray-100 dark:bg-vercel-gray-800 hover:bg-vercel-gray-200 dark:hover:bg-vercel-gray-700"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-vercel-gray-400" />
              ) : (
                <Moon className="w-4 h-4 text-vercel-gray-600" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg bg-vercel-gray-100 dark:bg-vercel-gray-800 hover:bg-vercel-gray-200 dark:hover:bg-vercel-gray-700"
              title="AI Insights"
            >
              <Sparkles className="w-4 h-4 text-vercel-gray-600 dark:text-vercel-gray-400" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg bg-vercel-gray-100 dark:bg-vercel-gray-800 hover:bg-vercel-gray-200 dark:hover:bg-vercel-gray-700"
              title="Export Report"
            >
              <Download className="w-4 h-4 text-vercel-gray-600 dark:text-vercel-gray-400" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
