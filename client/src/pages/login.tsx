import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({ message: "Login failed" }));
        throw new Error(body.message || "Login failed");
      }
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("auth", "1");
        setLocation("/");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = () => {
    setEmail("seedling@test.com");
    setPassword("12345");
  };

  return (
    <div className="min-h-screen bg-vercel-gray-50 dark:bg-vercel-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white dark:bg-vercel-gray-900 border border-vercel-gray-200/60 dark:border-vercel-gray-800/60 rounded-xl p-6 shadow-sm">
        <div className="mb-4">
          <h1 className="text-lg font-semibold tracking-[-0.01em] text-vercel-gray-900 dark:text-white">Sign in</h1>
          <p className="text-xs text-vercel-gray-600 dark:text-vercel-gray-400">Use your credentials to access the dashboard.</p>
        </div>
        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="block text-xs text-vercel-gray-600 dark:text-vercel-gray-400 mb-1">Email</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
          </div>
          <div>
            <label className="block text-xs text-vercel-gray-600 dark:text-vercel-gray-400 mb-1">Password</label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••" required />
          </div>
          {error && <div className="text-xs text-red-600 dark:text-red-400">{error}</div>}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Signing in…" : "Sign in"}
          </Button>
          <Button type="button" variant="outline" onClick={fillDemo} className="w-full">
            Fill demo credentials
          </Button>
        </form>
      </div>
    </div>
  );
}
