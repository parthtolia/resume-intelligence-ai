import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Upload, Users, BarChart3, Settings } from 'lucide-react';
import { cn } from '../lib/utils';

export function Sidebar({ className }: { className?: string }) {
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard' },
        { icon: Upload, label: 'Upload resumes', to: '/upload' },
        { icon: Users, label: 'Match Candidates', to: '/match' },
        { icon: BarChart3, label: 'Analytics', to: '/analytics' },
    ];

    return (
        <aside className={cn("hidden md:flex w-64 flex-col bg-white border-r h-screen sticky top-0", className)}>
            <div className="p-6 border-b flex items-center gap-2">
                <div className="bg-primary-600 text-white p-1.5 rounded-lg flex items-center justify-center">
                    <Users size={20} />
                </div>
                <span className="text-xl font-bold tracking-tight text-gray-900">Intelligence<span className="text-primary-600">AI</span></span>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) => cn(
                            "flex items-center gap-3 px-3 py-2 rounded-md font-medium text-sm transition-colors",
                            isActive
                                ? "bg-primary-50 text-primary-700"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        )}
                    >
                        <item.icon size={20} className="shrink-0" />
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t">
                <NavLink
                    to="/settings"
                    className={({ isActive }) => cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md font-medium text-sm transition-colors",
                        isActive
                            ? "bg-primary-50 text-primary-700"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )}
                >
                    <Settings size={20} className="shrink-0" />
                    Settings
                </NavLink>
            </div>
        </aside>
    );
}
