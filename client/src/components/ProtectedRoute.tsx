import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/admin/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? <>{children}</> : null;
}
