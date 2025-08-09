import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAppStore } from "@/lib/store";

import Header from "@/components/header";
import CartSidebar from "@/components/cart-sidebar";
import LoginModal from "@/components/login-modal";
import Home from "@/pages/home";
import Menu from "@/pages/menu";
import Checkout from "@/pages/checkout";
import Tracking from "@/pages/tracking";
import NotFound from "@/pages/not-found";

function Router() {
  const { currentPage } = useAppStore();

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {currentPage === 'home' && <Home />}
        {currentPage === 'vfc-menu' && <Menu />}
        {currentPage === 'checkout' && <Checkout />}
        {currentPage === 'tracking' && <Tracking />}
      </main>
      <CartSidebar />
      <LoginModal />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Switch>
          <Route path="/" component={Router} />
          <Route component={NotFound} />
        </Switch>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
