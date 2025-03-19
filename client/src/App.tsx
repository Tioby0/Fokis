import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/lib/auth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Header from "@/components/Header";
import Home from "@/pages/home";
import CategoryPage from "@/pages/category/[category]";
import Dashboard from "@/pages/admin/dashboard";
import Editor from "@/pages/admin/editor";
import AdminLogin from "@/pages/admin/login";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/category/:category" component={CategoryPage} />
          <Route path="/admin/login" component={AdminLogin} />
          <Route path="/admin/dashboard">
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          </Route>
          <Route path="/admin/editor">
            <ProtectedRoute>
              <Editor />
            </ProtectedRoute>
          </Route>
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;