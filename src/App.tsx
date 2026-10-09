import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { GlobalAIAssistant } from './components/common/GlobalAIAssistant';
import { CommandPalette } from './components/common/CommandPalette';
import { DemoModeBanner } from './components/common/DemoModeBanner';

// Public & Auth Pages
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { LandingPage } from './pages/LandingPage';

// Authenticated Customer Pages
import { CustomerDashboard } from './pages/CustomerDashboard';
import { UniversalAnalyzerPage } from './pages/UniversalAnalyzerPage';
import { ThreatDetailPage } from './pages/ThreatDetailPage';
import { CasesPage } from './pages/CasesPage';
import { CaseDetailPage } from './pages/CaseDetailPage';
import { EvidenceVaultPage } from './pages/EvidenceVaultPage';
import { SafetyCenterPage } from './pages/SafetyCenterPage';
import { PrepareComplaintPage } from './pages/PrepareComplaintPage';
import { ThreatGraphPage } from './pages/ThreatGraphPage';
import { CopilotPage } from './pages/CopilotPage';
import { SettingsPage } from './pages/SettingsPage';

// Protected Route Guard
const ProtectedRoute: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium text-slate-600">Verifying security session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

// Application Shell with Navbar, Footer, and floating Assistant (Only for Authenticated App)
const AuthenticatedShell: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <DemoModeBanner />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <GlobalAIAssistant />
      <CommandPalette />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <Routes>
            {/* 1. STANDALONE LOGIN & AUTHENTICATION PAGES (FIRST FRONTEND EXPERIENCE) */}
            <Route path="/" element={<SignInPage />} />
            <Route path="/signin" element={<Navigate to="/" replace />} />
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />

            {/* 2. AUTHENTICATED CUSTOMER PLATFORM (PROTECTED BY SESSION) */}
            <Route element={<ProtectedRoute><AuthenticatedShell /></ProtectedRoute>}>
              <Route path="/dashboard" element={<CustomerDashboard />} />
              <Route path="/analyze" element={<UniversalAnalyzerPage />} />
              <Route path="/threats/:id" element={<ThreatDetailPage />} />
              <Route path="/cases" element={<CasesPage />} />
              <Route path="/cases/:id" element={<CaseDetailPage />} />
              <Route path="/evidence" element={<EvidenceVaultPage />} />
              <Route path="/safety" element={<SafetyCenterPage />} />
              <Route path="/safety-center" element={<Navigate to="/safety" replace />} />
              <Route path="/complaint" element={<PrepareComplaintPage />} />
              <Route path="/prepare-complaint" element={<Navigate to="/complaint" replace />} />
              <Route path="/graph" element={<ThreatGraphPage />} />
              <Route path="/threat-graph" element={<Navigate to="/graph" replace />} />
              <Route path="/copilot" element={<CopilotPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/about" element={<LandingPage />} />
            </Route>

            {/* 3. CATCH-ALL REDIRECT TO LOGIN INDEX */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
