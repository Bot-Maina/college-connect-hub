import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Classes from "./pages/Classes";
import Assignments from "./pages/Assignments";
import Grades from "./pages/Grades";
import Resources from "./pages/Resources";
import Community from "./pages/Community";
import Schedule from "./pages/Schedule";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import Library from "./pages/Library";
import CreditTransfer from "./pages/CreditTransfer";
import SpiritualLife from "./pages/SpiritualLife";
import Settings from "./pages/Settings";
import Support from "./pages/Support";
import StudentManagement from "./pages/StudentManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/grades" element={<Grades />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/library" element={<Library />} />
            <Route path="/credit-transfer" element={<CreditTransfer />} />
            <Route path="/spiritual-life" element={<SpiritualLife />} />
            <Route path="/community" element={<Community />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/support" element={<Support />} />
            <Route path="/student-management" element={<StudentManagement />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
