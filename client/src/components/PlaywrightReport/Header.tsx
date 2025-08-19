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
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-vercel-gray-900/95 backdrop-blur-xl border-b border-vercel-gray-200/50 dark:border-vercel-gray-800/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <FlaskConical className="text-white w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-vercel-gray-900 to-vercel-gray-600 dark:from-white dark:to-vercel-gray-300 bg-clip-text text-transparent">AI-Native Test Results</h1>
                <p className="text-sm text-vercel-gray-500 dark:text-vercel-gray-400 font-medium">Testing-as-a-Service Platform</p>
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
                className="w-80 pl-11 pr-4 py-3 bg-vercel-gray-50 dark:bg-vercel-gray-800/50 border-vercel-gray-200/60 dark:border-vercel-gray-700/60 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 rounded-xl shadow-sm transition-all duration-200"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-vercel-gray-400 w-4 h-4" />
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="w-10 h-10 rounded-xl bg-vercel-gray-100/80 dark:bg-vercel-gray-800/80 hover:bg-vercel-gray-200 dark:hover:bg-vercel-gray-700 transition-all duration-200 hover:scale-105"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-vercel-gray-500 dark:text-vercel-gray-400" />
              ) : (
                <Moon className="w-4 h-4 text-vercel-gray-600" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-xl bg-vercel-gray-100/80 dark:bg-vercel-gray-800/80 hover:bg-vercel-gray-200 dark:hover:bg-vercel-gray-700 transition-all duration-200 hover:scale-105"
              title="AI Insights"
            >
              <Sparkles className="w-4 h-4 text-vercel-gray-600 dark:text-vercel-gray-400" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-xl bg-vercel-gray-100/80 dark:bg-vercel-gray-800/80 hover:bg-vercel-gray-200 dark:hover:bg-vercel-gray-700 transition-all duration-200 hover:scale-105"
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
