import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { Users, FileText, TrendingUp, UploadCloud, Loader2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

interface AnalyticsData {
    total_resumes: number;
    top_skills: Record<string, number>;
}

export default function Dashboard() {
    const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchAnalytics() {
            try {
                const response = await fetch(`${API_URL}/api/analytics/overview`);
                if (response.ok) {
                    const data = await response.json();
                    setAnalytics(data);
                }
            } catch (err) {
                console.error('Failed to fetch analytics:', err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchAnalytics();
    }, []);

    const stats = [
        {
            label: 'Total Candidates',
            value: isLoading ? '...' : analytics?.total_resumes?.toLocaleString() ?? '0',
            icon: Users,
            desc: 'Resumes in your talent pool',
        },
        {
            label: 'Top Skill',
            value: isLoading ? '...' : (analytics?.top_skills ? Object.keys(analytics.top_skills)[0] ?? 'N/A' : 'N/A'),
            icon: TrendingUp,
            desc: 'Most common skill across resumes',
        },
        {
            label: 'Skills Tracked',
            value: isLoading ? '...' : (analytics?.top_skills ? Object.keys(analytics.top_skills).length.toString() : '0'),
            icon: FileText,
            desc: 'Unique skills identified by AI',
        },
    ];

    const topSkills = analytics?.top_skills
        ? Object.entries(analytics.top_skills).slice(0, 5)
        : [];
    const maxSkillCount = topSkills.length > 0 ? topSkills[0][1] : 1;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900"
                    style={{ fontFamily: "'Fjalla One', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Dashboard Overview
                </h1>
                <p className="text-gray-500 mt-1">Here is a summary of your talent pool and recent activity.</p>
            </div>

            {/* Stat Cards */}
            <div className="grid gap-6 md:grid-cols-3">
                {stats.map((stat, i) => (
                    <Card key={i} className="border-l-4 border-l-primary-500">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wide">{stat.label}</CardTitle>
                            <stat.icon className="h-4 w-4 text-primary-500" />
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <Loader2 className="h-6 w-6 animate-spin text-primary-500" />
                                    <span className="text-gray-400 text-sm">Loading...</span>
                                </div>
                            ) : (
                                <>
                                    <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                                    <p className="text-xs text-gray-400 mt-1">{stat.desc}</p>
                                </>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Recent Uploads */}
                <Card>
                    <CardHeader>
                        <CardTitle style={{ fontFamily: "'Fjalla One', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Recent Uploads
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-gray-100 rounded-lg">
                            <UploadCloud className="h-10 w-10 text-gray-300 mb-3" />
                            <p className="text-gray-500 mb-4">Upload a resume to get started</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Top Skills from DB */}
                <Card>
                    <CardHeader>
                        <CardTitle style={{ fontFamily: "'Fjalla One', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Top Skills in Talent Pool
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <div className="flex items-center justify-center p-8">
                                <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
                            </div>
                        ) : topSkills.length > 0 ? (
                            <div className="space-y-4">
                                {topSkills.map(([skill, count]) => (
                                    <div key={skill} className="flex items-center justify-between gap-4">
                                        <span className="text-sm font-medium text-gray-700 min-w-[100px]">{skill}</span>
                                        <div className="h-2 flex-1 bg-gray-100 overflow-hidden">
                                            <div
                                                className="h-full bg-primary-500 transition-all duration-500"
                                                style={{ width: `${(count / maxSkillCount) * 100}%` }}
                                            />
                                        </div>
                                        <span className="text-sm text-gray-500 min-w-[30px] text-right">{count}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-400 text-center py-8">No skill data yet. Upload resumes to see insights.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
