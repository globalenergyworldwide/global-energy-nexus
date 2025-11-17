import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Refinery from "./pages/Refinery";
import Surveying from "./pages/Surveying";
import ExportImport from "./pages/ExportImport";
import P2PPlatform from "./pages/P2PPlatform";
import P2PTradingPlatform from "./pages/P2PTradingPlatform";
import Shop from "./pages/Shop";
import Investors from "./pages/Investors";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LanguageProvider>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/refinery" element={<Refinery />} />
              <Route path="/surveying" element={<Surveying />} />
              <Route path="/export-import" element={<ExportImport />} />
              <Route path="/p2p-platform" element={<P2PPlatform />} />
              <Route path="/p2p-trading" element={<P2PTradingPlatform />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/investors" element={<Investors />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/contact" element={<Contact />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </LanguageProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
