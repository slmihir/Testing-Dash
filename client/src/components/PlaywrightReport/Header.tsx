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
  
  const handleDownload = async () => {
    try {
      console.log('Starting PDF download...');
      
      // Use the separate PDF server on port 3001
      const res = await fetch('http://localhost:3001/report.pdf', {
        method: 'GET',
        mode: 'cors',
      });
      
      console.log('Response status:', res.status);
      console.log('Response headers:', Object.fromEntries(res.headers.entries()));
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Server error:', errorText);
        throw new Error(`Failed to generate PDF: ${res.status} ${res.statusText}`);
      }
      
      // Explicitly set the blob type to PDF
      const arrayBuffer = await res.arrayBuffer();
      console.log('Received data size:', arrayBuffer.byteLength);
      
      const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'playwright-report.pdf';
      link.type = 'application/pdf';
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      
      console.log('PDF download completed successfully');
    } catch (err) {
      console.error('Failed to download PDF:', err);
      alert(`Failed to download PDF: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-vercel-gray-900/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-vercel-gray-900/70 border-b border-vercel-gray-200/60 dark:border-vercel-gray-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center ring-1 ring-vercel-gray-200 dark:ring-vercel-gray-800">
                <FlaskConical className="text-vercel-gray-700 dark:text-vercel-gray-300 w-4 h-4" />
              </div>
              <div>
                <h1 className="text-sm font-semibold tracking-[-0.01em] text-vercel-gray-900 dark:text-white">Test Results</h1>
                <p className="text-xs text-vercel-gray-500 dark:text-vercel-gray-400">Playwright report</p>
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
                className="w-64 pl-10 bg-white dark:bg-vercel-gray-900 border-vercel-gray-200 dark:border-vercel-gray-800 focus-visible:ring-1 focus-visible:ring-vercel-gray-400 dark:focus-visible:ring-vercel-gray-600"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-vercel-gray-400 w-4 h-4" />
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hover:bg-vercel-gray-100 dark:hover:bg-vercel-gray-800"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-vercel-gray-600 dark:text-vercel-gray-300" />
              ) : (
                <Moon className="w-4 h-4 text-vercel-gray-600" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDownload}
              className="hover:bg-vercel-gray-100 dark:hover:bg-vercel-gray-800"
            >
              <Download className="w-4 h-4 text-vercel-gray-600 dark:text-vercel-gray-400" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
