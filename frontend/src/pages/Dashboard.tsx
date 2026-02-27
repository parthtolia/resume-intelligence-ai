import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { Users, FileText, UploadCloud, TrendingUp } from 'lucide-react';

export default function Dashboard() {
    const stats = [
        { label: 'Total Candidates', value: '1,248', change: '+12%', icon: Users },
        { label: 'New Resumes', value: '84', change: '+24%', icon: FileText },
        { label: 'Avg Similarity Score', value: '78%', change: '+5%', icon: TrendingUp },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-500 mt-1">Here is a summary of your talent pool and recent activity.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {stats.map((stat, i) => (
                    <Card key={i}>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">{stat.label}</CardTitle>
                            <stat.icon className="h-4 w-4 text-primary-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                            <p className="text-xs text-green-600 mt-1 flex items-center font-medium">
                                {stat.change} <span className="text-gray-400 ml-1 font-normal">from last month</span>
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Recent Uploads Widget placeholder */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Recent Uploads</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-gray-100 rounded-lg">
                            <UploadCloud className="h-10 w-10 text-gray-300 mb-3" />
                            <p className="text-gray-500 mb-4">No recent uploads</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Top Skills Widget placeholder */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Top Skills Matched</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {['React', 'TypeScript', 'Node.js'].map((skill, i) => (
                                <div key={skill} className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-700">{skill}</span>
                                    <div className="h-2 w-full bg-gray-100 rounded-full mx-4 overflow-hidden flex-1 max-w-[60%]">
                                        <div className="h-full bg-primary-500 rounded-full" style={{ width: `${80 - (i * 15)}%` }}></div>
                                    </div>
                                    <span className="text-sm text-gray-500">{80 - (i * 15)}%</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
