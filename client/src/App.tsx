import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import PlaywrightReport from "@/pages/playwright-report";
import NotFound from "@/pages/not-found";
import LoginPage from "@/pages/login";
import { AuthProvider, useAuth } from "./lib/auth";
import { useEffect } from "react";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthed, isReady } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (isReady && !isAuthed) navigate("/login");
  }, [isReady, isAuthed, navigate]);

  if (!isReady) return null;
  if (!isAuthed) return null;
  return children;
}

function LoginRoute() {
  const { isAuthed, isReady } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (isReady && isAuthed) navigate("/");
  }, [isReady, isAuthed, navigate]);

  return <LoginPage />;
}

function Router() {
  return (
    <Switch>
      <Route path="/login" component={LoginRoute} />
      <Route path="/" component={() => (
        <ProtectedRoute>
          <PlaywrightReport />
        </ProtectedRoute>
      )} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AuthProvider>
          <Router />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
