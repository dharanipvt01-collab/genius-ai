import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Shield, Bell, Search, User as UserIcon, LogOut, ChevronDown,
  Menu, X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { CommandPalette } from './CommandPalette';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { unreadCount, notifications, markAsRead, markAllAsRead } = useNotifications();
  const location = useLocation();
  const navigate = useNavigate();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  // Single Customer Navigation Links
  const customerLinks = [
    { label: 'Safety Dashboard', path: '/dashboard' },
    { label: 'Threat Analyzer', path: '/analyze' },
    { label: 'Threat Graph', path: '/graph' },
    { label: 'Evidence Vault', path: '/evidence' },
    { label: 'My Cases', path: '/cases' },
    { label: 'Safety Navigator', path: '/safety' },
    { label: 'Prepare Complaint', path: '/complaint' },
    { label: 'AI Copilot', path: '/copilot' },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <Link to={user ? '/dashboard' : '/'} className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
                <Shield className="w-5 h-5 fill-white/20 stroke-white" />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                  Genius AI
                </span>
                <span className="hidden sm:inline-block ml-2 text-[10px] font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-200/60 px-1.5 py-0.5 rounded-md">
                  Protection
                </span>
              </div>
            </Link>

            {/* Desktop Customer Navigation Links */}
            {user && (
              <nav className="hidden lg:flex items-center gap-1">
                {customerLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                      isActive(link.path)
                        ? 'bg-blue-50 text-blue-700 font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            )}
          </div>

          {/* Right Section Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Quick Command Palette Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/70 text-slate-500 hover:text-slate-800 text-xs transition-colors border border-slate-200/60"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Search protection...</span>
              <kbd className="text-[10px] font-mono bg-white px-1.5 py-0.5 rounded-md border border-slate-200 text-slate-400 shadow-2xs">
                Ctrl K
              </kbd>
            </button>

            {user ? (
              <>
                {/* Notifications Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsNotifOpen(!isNotifOpen)}
                    className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 relative transition-colors"
                    aria-label="Notifications"
                  >
                    <Bell className="w-4 h-4" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white animate-pulse" />
                    )}
                  </button>

                  {isNotifOpen && (
                    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">Notifications</span>
                          {unreadCount > 0 && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold">
                              {unreadCount} new
                            </span>
                          )}
                        </div>
                        <button
                          onClick={markAllAsRead}
                          className="text-[11px] text-blue-600 hover:underline font-medium"
                        >
                          Mark all as read
                        </button>
                      </div>

                      <div className="max-h-72 overflow-y-auto space-y-2">
                        {notifications.map((n) => (
                          <div
                            key={n.id}
                            onClick={() => markAsRead(n.id)}
                            className={`p-2.5 rounded-xl text-left cursor-pointer transition-colors ${
                              n.read ? 'bg-slate-50/50' : 'bg-blue-50/40 border border-blue-100'
                            }`}
                          >
                            <div className="flex items-center justify-between text-xs font-semibold text-slate-900">
                              <span>{n.title}</span>
                              <span className="text-[10px] text-slate-400 font-normal">{n.timestamp}</span>
                            </div>
                            <p className="text-xs text-slate-600 mt-1 leading-snug">{n.message}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* User Profile Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                      {user.name.charAt(0)}
                    </div>
                    <div className="hidden sm:block text-left text-xs font-semibold text-slate-800">
                      {user.name.split(' ')[0]}
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50">
                      <div className="px-3 py-2 border-b border-slate-100 mb-1">
                        <div className="text-xs font-bold text-slate-900 truncate">{user.name}</div>
                        <div className="text-[11px] text-slate-500 truncate">{user.email}</div>
                        <div className="mt-1.5 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700 inline-block">
                          Protected Customer
                        </div>
                      </div>

                      <Link
                        to="/settings"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="w-full px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-xl flex items-center gap-2 transition-colors"
                      >
                        <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                        Account Settings
                      </Link>

                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          logout();
                          navigate('/signin');
                        }}
                        className="w-full px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-xl flex items-center gap-2 transition-colors mt-1"
                      >
                        <LogOut className="w-3.5 h-3.5 text-rose-500" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/signin"
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
                >
                  Create account
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden px-4 pt-2 pb-6 border-t border-slate-100 bg-white space-y-2">
            {user && (
              <div className="grid grid-cols-2 gap-1.5">
                {customerLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold ${
                      isActive(link.path) ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </header>

      {/* Global Command Palette */}
      <CommandPalette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
