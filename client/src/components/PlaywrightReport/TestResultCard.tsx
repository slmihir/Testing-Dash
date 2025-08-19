import { useState } from "react";
import { ChevronDown, ExternalLink, Check, X, Clock, Chrome, Smartphone, Image, Play, FileText, AlertTriangle, Brain, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TestResult, TestStep, TestAttachment, TestPerformance } from "@shared/schema";

interface TestResultCardProps {
  test: TestResult;
}

export function TestResultCard({ test }: TestResultCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const formatDuration = (ms: number) => {
    return `${(ms / 1000).toFixed(1)}s`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed':
        return 'text-green-600 dark:text-green-400';
      case 'failed':
        return 'text-red-600 dark:text-red-400';
      case 'skipped':
        return 'text-yellow-600 dark:text-yellow-400';
      default:
        return 'text-vercel-gray-600 dark:text-vercel-gray-400';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'passed':
        return <Badge className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">PASSED</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">FAILED</Badge>;
      case 'skipped':
        return <Badge className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">SKIPPED</Badge>;
      default:
        return null;
    }
  };

  const getStatusDot = (status: string) => {
    const baseClasses = "w-3 h-3 rounded-full mt-2";
    switch (status) {
      case 'passed':
        return `${baseClasses} bg-green-500`;
      case 'failed':
        return `${baseClasses} bg-red-500`;
      case 'skipped':
        return `${baseClasses} bg-yellow-500`;
      default:
        return `${baseClasses} bg-vercel-gray-400`;
    }
  };

  const getBrowserIcon = (browser: string) => {
    switch (browser.toLowerCase()) {
      case 'chromium':
      case 'chrome':
        return <Chrome className="w-4 h-4" />;
      default:
        return <Chrome className="w-4 h-4" />;
    }
  };

  const steps = test.steps as TestStep[] || [];
  const attachments = test.attachments as TestAttachment[] || [];
  const performance = test.performance as TestPerformance || { setup: 0, execution: 0 };

  // AI-generated insights (simulated)
  const aiInsights = test.status === 'failed' ? [
    "Selector stability issue detected - element may be dynamically loaded",
    "Network timeout contributed to failure - consider increasing wait time",
    "Self-healing capability will auto-fix this issue in next run"
  ] : test.status === 'passed' ? [
    "Test executed with optimal performance",
    "All assertions validated successfully"
  ] : [];

  const cardClasses = test.status === 'failed' 
    ? "border-red-200 dark:border-red-900/30 hover:shadow-lg"
    : "border-vercel-gray-200 dark:border-vercel-gray-800 hover:shadow-lg";

  return (
    <Card className={`${cardClasses} transition-all duration-300 group`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            <div className={getStatusDot(test.status)} />
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-lg font-semibold text-vercel-gray-900 dark:text-vercel-gray-100">
                  {test.title}
                </h3>
                {getStatusBadge(test.status)}
              </div>
              <p className="text-sm text-vercel-gray-600 dark:text-vercel-gray-400 mb-3">
                {test.description}
              </p>
              
              <div className="flex items-center space-x-6 text-sm text-vercel-gray-500 dark:text-vercel-gray-400">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{formatDuration(test.duration)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {getBrowserIcon(test.browser)}
                  <span>{test.browser}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Smartphone className="w-4 h-4" />
                  <span>{test.viewport}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-vercel-gray-50 dark:bg-vercel-gray-800 hover:bg-vercel-gray-100 dark:hover:bg-vercel-gray-700"
            >
              <ExternalLink className="w-4 h-4 text-vercel-gray-500 dark:text-vercel-gray-400" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
              className="bg-vercel-gray-50 dark:bg-vercel-gray-800 hover:bg-vercel-gray-100 dark:hover:bg-vercel-gray-700"
            >
              <ChevronDown 
                className={`w-4 h-4 text-vercel-gray-500 dark:text-vercel-gray-400 transform transition-transform duration-200 ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              />
            </Button>
          </div>
        </div>
      </CardContent>
      
      {isExpanded && (
        <div className={`border-t ${test.status === 'failed' ? 'border-red-100/60 dark:border-red-900/30 bg-gradient-to-br from-red-50/50 to-red-25/50 dark:from-red-950/20 dark:to-red-900/10' : 'border-vercel-gray-100/60 dark:border-vercel-gray-800/60 bg-gradient-to-br from-vercel-gray-50/50 to-vercel-gray-25/50 dark:from-vercel-gray-950/30 dark:to-vercel-gray-900/50'} backdrop-blur-sm`}>
          <div className="p-8 space-y-6">
            {/* AI Insights */}
            {aiInsights.length > 0 && (
              <div className="bg-gradient-to-r from-blue-50/80 to-purple-50/80 dark:from-blue-950/30 dark:to-purple-950/30 rounded-2xl p-6 border border-blue-200/60 dark:border-blue-800/60 mb-6 backdrop-blur-sm shadow-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="text-base font-semibold text-blue-900 dark:text-blue-200">AI Insights</h4>
                </div>
                <div className="space-y-3">
                  {aiInsights.map((insight, index) => (
                    <div key={index} className="flex items-start space-x-3 text-sm">
                      <Lightbulb className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span className="text-vercel-gray-700 dark:text-vercel-gray-300 leading-relaxed">{insight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {test.status === 'failed' && (test.errorMessage || test.errorStack) && (
              <div className="bg-white dark:bg-vercel-gray-800 rounded-lg p-4 border-l-4 border-red-500 mb-4">
                <h4 className="text-sm font-medium text-red-900 dark:text-red-200 mb-2">Error Details</h4>
                <div className="bg-vercel-gray-100 dark:bg-vercel-gray-900 rounded-md p-3 font-mono text-sm overflow-x-auto">
                  <pre className="text-red-700 dark:text-red-300 syntax-highlight">
                    {test.errorMessage && (
                      <div className="error">{test.errorMessage}</div>
                    )}
                    {test.errorStack && (
                      <div className="mt-2 text-vercel-gray-600 dark:text-vercel-gray-400">
                        {test.errorStack}
                      </div>
                    )}
                  </pre>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/80 dark:bg-vercel-gray-800/80 rounded-2xl p-6 backdrop-blur-sm shadow-sm border border-vercel-gray-200/60 dark:border-vercel-gray-700/60">
                <h4 className="text-base font-semibold text-vercel-gray-900 dark:text-vercel-gray-100 mb-4">
                  {test.status === 'failed' ? 'Failed Steps' : 'Steps'}
                </h4>
                <div className="space-y-2 text-sm text-vercel-gray-600 dark:text-vercel-gray-400">
                  {steps.length > 0 ? steps.map((step, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      {step.status === 'passed' ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : step.status === 'failed' ? (
                        <X className="w-4 h-4 text-red-500" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      )}
                      <span>{step.description}</span>
                    </div>
                  )) : (
                    <div className="text-vercel-gray-400">No step details available</div>
                  )}
                </div>
              </div>
              
              <div className="bg-white/80 dark:bg-vercel-gray-800/80 rounded-2xl p-6 backdrop-blur-sm shadow-sm border border-vercel-gray-200/60 dark:border-vercel-gray-700/60">
                <h4 className="text-base font-semibold text-vercel-gray-900 dark:text-vercel-gray-100 mb-4">Attachments</h4>
                <div className="space-y-2">
                  {attachments.length > 0 ? attachments.map((attachment, index) => {
                    const getAttachmentStyle = (type: string) => {
                      switch (type) {
                        case 'image':
                          return 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30';
                        case 'video':
                          return 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/30';
                        default:
                          return 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 hover:bg-yellow-100 dark:hover:bg-yellow-900/30';
                      }
                    };

                    const getAttachmentIcon = (type: string) => {
                      switch (type) {
                        case 'image':
                          return <Image className="w-4 h-4" />;
                        case 'video':
                          return <Play className="w-4 h-4" />;
                        default:
                          return <FileText className="w-4 h-4" />;
                      }
                    };

                    return (
                      <Button
                        key={index}
                        variant="ghost"
                        className={`w-full justify-start px-3 py-2 text-sm rounded-md transition-colors duration-200 ${getAttachmentStyle(attachment.type)}`}
                      >
                        {getAttachmentIcon(attachment.type)}
                        <span className="ml-2">{attachment.name}</span>
                      </Button>
                    );
                  }) : (
                    <div className="text-sm text-vercel-gray-400">No attachments</div>
                  )}
                </div>
              </div>
              
              <div className="bg-white/80 dark:bg-vercel-gray-800/80 rounded-2xl p-6 backdrop-blur-sm shadow-sm border border-vercel-gray-200/60 dark:border-vercel-gray-700/60">
                <h4 className="text-base font-semibold text-vercel-gray-900 dark:text-vercel-gray-100 mb-4">Performance</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-vercel-gray-600 dark:text-vercel-gray-400">Setup</span>
                      <span className="font-medium">{formatDuration(performance.setup)}</span>
                    </div>
                    <div className="w-full bg-vercel-gray-200 dark:bg-vercel-gray-700 rounded-full h-1.5">
                      <div 
                        className="bg-blue-500 h-1.5 rounded-full"
                        style={{ width: `${Math.min((performance.setup / test.duration) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-vercel-gray-600 dark:text-vercel-gray-400">Execution</span>
                      <span className="font-medium">{formatDuration(performance.execution)}</span>
                    </div>
                    <div className="w-full bg-vercel-gray-200 dark:bg-vercel-gray-700 rounded-full h-1.5">
                      <div 
                        className="bg-green-500 h-1.5 rounded-full"
                        style={{ width: `${Math.min((performance.execution / test.duration) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
