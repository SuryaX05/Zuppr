import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Header from "@/components/header";
import CartSidebar from "@/components/cart-sidebar";
import LoginModal from "@/components/login-modal";
import Home from "@/pages/home";
import Menu from "@/pages/menu";
import Checkout from "@/pages/checkout";
import Tracking from "@/pages/tracking";
import NotFound from "@/pages/not-found";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen">
          <Header />
          <main className="pt-20">
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/menu/:id" component={Menu} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/tracking" component={Tracking} />
              <Route component={NotFound} />
            </Switch>
          </main>
          <CartSidebar />
          <LoginModal />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
