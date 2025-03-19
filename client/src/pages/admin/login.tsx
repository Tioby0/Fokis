import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [, navigate] = useLocation();
  const { signIn } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signIn(email, password);
      navigate("/admin/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] p-4">
      <Card className="w-full max-w-md bg-black/50 border-gray-800">
        <CardHeader className="space-y-2 items-center text-center">
          <img
            src="/logo-dark.png"
            alt="FOKIS Now"
            className="h-12 mx-auto mb-4"
          />
          <CardTitle className="text-2xl font-poppins text-white">
            Admin Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-black/30 border-gray-700 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-black/30 border-gray-700 text-white"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#D0A64B] hover:bg-[#D0A64B]/90 text-black"
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </Button>
            <button
              type="button"
              className="w-full text-center text-sm text-gray-400 hover:text-gray-300 mt-2"
            >
              Reset Password
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
