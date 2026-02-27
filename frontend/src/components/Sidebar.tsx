import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Upload, Users, BarChart3, Settings, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

export function Sidebar({ className }: { className?: string }) {
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard' },
        { icon: Upload, label: 'Upload Resumes', to: '/upload' },
        { icon: Users, label: 'Match Candidates', to: '/match' },
        { icon: BarChart3, label: 'Analytics', to: '/analytics' },
    ];

    return (
        <aside className={cn("hidden md:flex w-64 flex-col h-screen sticky top-0", className)}
            style={{ backgroundColor: '#223240' }}>
            {/* Logo */}
            <div className="p-6 border-b border-white/10 flex items-center gap-3">
                <div className="bg-primary-500 text-white p-1.5 flex items-center justify-center">
                    <Sparkles size={20} />
                </div>
                <span className="text-xl font-bold tracking-tight text-white"
                    style={{ fontFamily: "'Fjalla One', sans-serif", letterSpacing: '0.05em' }}>
                    INTELLIGENCE<span className="text-primary-400">AI</span>
                </span>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) => cn(
                            "flex items-center gap-3 px-3 py-2.5 font-medium text-sm transition-colors uppercase tracking-wide",
                            isActive
                                ? "bg-primary-500 text-white"
                                : "text-white/70 hover:bg-white/10 hover:text-white"
                        )}
                    >
                        <item.icon size={18} className="shrink-0" />
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            {/* Settings */}
            <div className="p-4 border-t border-white/10">
                <NavLink
                    to="/settings"
                    className={({ isActive }) => cn(
                        "flex items-center gap-3 px-3 py-2.5 font-medium text-sm transition-colors uppercase tracking-wide",
                        isActive
                            ? "bg-primary-500 text-white"
                            : "text-white/50 hover:bg-white/10 hover:text-white"
                    )}
                >
                    <Settings size={18} className="shrink-0" />
                    Settings
                </NavLink>
            </div>
        </aside>
    );
}
