import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import PlaywrightReport from "@/pages/playwright-report";
import NotFound from "@/pages/not-found";
import LoginPage from "@/pages/login";

function ProtectedRoute({ component: Component }: { component: any }) {
  const isAuthed = typeof window !== 'undefined' && localStorage.getItem("auth") === "1";
  return isAuthed ? <Component /> : <Redirect to="/login" />;
}

function Router() {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/" component={() => <ProtectedRoute component={PlaywrightReport} />} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
