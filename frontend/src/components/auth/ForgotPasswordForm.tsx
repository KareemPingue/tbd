
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate password reset email process
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
      toast.success("Password reset link sent to your email");
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="element-transition space-y-6 md:w-[400px] w-full">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Check your email</h1>
          <p className="text-muted-foreground">
            We've sent a password reset link to <span className="font-medium">{email}</span>
          </p>
        </div>
        <div className="flex flex-col space-y-4">
          <p className="text-sm text-center text-muted-foreground">
            Didn't receive the email? Check your spam folder or try again.
          </p>
          <Button variant="outline" className="w-full" onClick={() => setSubmitted(false)}>
            Try a different email
          </Button>
          <Link to="/auth/login">
            <Button variant="link" className="w-full">
              Back to login
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="element-transition space-y-6 md:w-[400px] w-full">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Forgot password</h1>
        <p className="text-muted-foreground">
          Enter your email and we'll send you a reset link
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Sending email..." : "Send reset link"}
        </Button>
      </form>
      <div className="flex justify-center">
        <Link 
          to="/auth/login" 
          className="inline-flex items-center text-sm text-primary hover:text-primary/90 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to login
        </Link>
      </div>
    </div>
  );
}
