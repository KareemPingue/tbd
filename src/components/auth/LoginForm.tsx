
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/dashboard";
    }, 1500);
  };

  return (
    <div className="element-transition space-y-6 md:w-[400px] w-full">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="text-muted-foreground">
          Enter your credentials to access your account
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            required
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              to="/auth/reset-password"
              className="text-sm underline text-muted-foreground hover:text-primary transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            autoCapitalize="none"
            autoComplete="current-password"
            required
          />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="remember" />
          <label
            htmlFor="remember"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remember me
          </label>
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
      <div className="mt-4 text-center text-sm">
        Don't have an account?{" "}
        <Link
          to="/auth/register"
          className="underline text-primary hover:text-primary/90 transition-colors"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
