import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { Search, Sparkles, User } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

interface MatchResult {
    resume_id: string;
    filename: string;
    similarity_score: number;
    skills_matched: string[];
}

export default function MatchPage() {
    const [jobTitle, setJobTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [isMatching, setIsMatching] = useState(false);
    const [results, setResults] = useState<MatchResult[] | null>(null);
    const [error, setError] = useState('');

    const handleMatch = async () => {
        if (!jobTitle || !jobDescription) {
            setError('Please provide both job title and description');
            return;
        }

        setIsMatching(true);
        setError('');

        try {
            const response = await axios.post(`${API_URL}/api/matching/match`, {
                title: jobTitle,
                description: jobDescription
            });
            setResults(response.data);
        } catch (err) {
            console.error(err);
            setError('Failed to find matches. Please try again.');
        } finally {
            setIsMatching(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Semantic Matching</h1>
                <p className="text-gray-500 mt-1">Paste your job description to instantly find the best candidates using our AI embedding model.</p>
            </div>

            <div className="grid md:grid-cols-5 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Job Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                                <input
                                    type="text"
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border p-2"
                                    placeholder="e.g. Senior Frontend Engineer"
                                    value={jobTitle}
                                    onChange={e => setJobTitle(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
                                <textarea
                                    rows={8}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border p-2"
                                    placeholder="Paste the full job description here..."
                                    value={jobDescription}
                                    onChange={e => setJobDescription(e.target.value)}
                                />
                            </div>
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            <Button
                                className="w-full"
                                onClick={handleMatch}
                                disabled={isMatching}
                            >
                                {isMatching ? (
                                    <>Searching...</>
                                ) : (
                                    <><Sparkles className="mr-2 h-4 w-4" /> Find Matches</>
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <div className="md:col-span-3">
                    <Card className="h-full min-h-[500px]">
                        <CardHeader className="border-b bg-gray-50/50">
                            <CardTitle className="flex justify-between items-center">
                                <span>Top Results</span>
                                {results && <span className="text-sm font-normal text-gray-500">{results.length} candidates found</span>}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            {!results && !isMatching && (
                                <div className="flex flex-col items-center justify-center h-[400px] text-gray-400">
                                    <Search className="h-12 w-12 mb-4 text-gray-300" />
                                    <p>Enter job details to see AI matches</p>
                                </div>
                            )}

                            {isMatching && (
                                <div className="flex flex-col items-center justify-center h-[400px] space-y-4">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                                    <p className="text-sm text-gray-500 animate-pulse">Running semantic analysis...</p>
                                </div>
                            )}

                            {results && results.length > 0 && (
                                <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto w-full">
                                    {results.map((result) => (
                                        <div key={result.resume_id} className="p-6 hover:bg-gray-50 transition-colors">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold shrink-0">
                                                        <User size={20} />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-base font-semibold text-gray-900 truncate max-w-[200px]">{result.filename}</h4>
                                                        <p className="text-xs text-gray-500">#{result.resume_id.substring(0, 8)}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                                        {(result.similarity_score * 100).toFixed(1)}% Match
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Extracted Skills</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {result.skills_matched && result.skills_matched.length > 0 ? (
                                                        result.skills_matched.map(skill => (
                                                            <span key={skill} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                                                                {skill}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span className="text-sm text-gray-400 italic">No exact skill keywords extracted</span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="mt-4 pt-4 border-t flex justify-end">
                                                <Button variant="outline" size="sm">View Full Resume</Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {results && results.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-[400px] text-gray-500">
                                    <p>No matches found in the database.</p>
                                    <p className="text-sm mt-2">Try uploading more resumes.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
