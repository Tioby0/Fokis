import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import Home from "@/pages/home";
import Dashboard from "@/pages/admin/dashboard";
import Editor from "@/pages/admin/editor";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/admin/dashboard" component={Dashboard} />
          <Route path="/admin/editor" component={Editor} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
