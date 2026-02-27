import { Sidebar } from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import { Search, Bell, User } from 'lucide-react';

export function TopNav() {
    return (
        <header className="bg-white border-b h-16 flex items-center justify-between px-6 sticky top-0 z-10">
            <div className="flex-1 flex max-w-md ml-4">
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <input
                        id="search"
                        className="block w-full h-10 pl-10 pr-3 border border-gray-200 rounded-md leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 sm:text-sm transition-colors"
                        placeholder="Search candidates, jobs..."
                        type="search"
                    />
                </div>
            </div>
            <div className="ml-4 flex items-center gap-4">
                <button className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none ring-2 ring-transparent focus:ring-primary-500 transition-shadow">
                    <span className="sr-only">View notifications</span>
                    <Bell className="h-5 w-5" aria-hidden="true" />
                </button>

                <div className="relative flex-shrink-0">
                    <button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                        <span className="sr-only">Open user menu</span>
                        <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold border border-primary-200">
                            <User size={16} />
                        </div>
                    </button>
                </div>
            </div>
        </header>
    );
}

export default function DashboardLayout() {
    return (
        <div className="flex h-screen bg-gray-50 font-sans text-gray-900 overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <TopNav />
                <main className="flex-1 overflow-y-auto p-6 md:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
