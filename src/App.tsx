
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DashboardPage from "./pages/dashboard/DashboardPage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import ChatDashboard from "./pages/dashboard/ChatDashboard";
import PackageSettings from "./pages/dashboard/settings/PackageSettings";

// Layouts
import DashboardLayout from "./layouts/DashboardLayout";

// Context Providers
import { AuthProvider } from "./contexts/AuthContext";

// Create a client for React Query
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            
            <Route path="/dashboard" element={
              <DashboardLayout>
                <DashboardPage />
              </DashboardLayout>
            } />

            <Route path="/dashboard/chat" element={
              <DashboardLayout>
                <ChatDashboard />
              </DashboardLayout>
            } />
            
            <Route path="/dashboard/settings" element={
              <DashboardLayout>
                <SettingsPage />
              </DashboardLayout>
            } />
            
            <Route path="/dashboard/settings/packages" element={
              <DashboardLayout>
                <PackageSettings />
              </DashboardLayout>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
        
        {/* Toasts */}
        <Toaster />
        <Sonner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
