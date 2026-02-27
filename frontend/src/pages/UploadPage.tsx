import { useState, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { UploadCloud, File, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import axios from 'axios';

// Assuming vite proxy or env var is setup for backend
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function UploadPage() {
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const validateFile = (file: File) => {
        if (file.type !== 'application/pdf') {
            setErrorMessage('Only PDF files are supported.');
            setUploadStatus('error');
            return false;
        }
        // 10MB limit
        if (file.size > 10 * 1024 * 1024) {
            setErrorMessage('File size must be less than 10MB.');
            setUploadStatus('error');
            return false;
        }
        return true;
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            if (validateFile(droppedFile)) {
                setFile(droppedFile);
                setUploadStatus('idle');
                setErrorMessage('');
            }
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            if (validateFile(selectedFile)) {
                setFile(selectedFile);
                setUploadStatus('idle');
                setErrorMessage('');
            }
        }
    };

    const removeFile = () => {
        setFile(null);
        setUploadStatus('idle');
        setErrorMessage('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleUpload = async () => {
        if (!file) return;

        setUploadStatus('uploading');
        const formData = new FormData();
        formData.append('file', file);

        try {
            await axios.post(`${API_URL}/api/resumes/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setUploadStatus('success');
        } catch (err: any) {
            console.error(err);
            setUploadStatus('error');
            setErrorMessage(err.response?.data?.detail || 'An error occurred during upload.');
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Upload Resumes</h1>
                <p className="text-gray-500 mt-1">Add new candidates to your talent pool. Our AI will automatically parse and vectorize them.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Resume Uploader</CardTitle>
                </CardHeader>
                <CardContent>
                    {!file ? (
                        <div
                            className={cn(
                                "border-2 border-dashed rounded-xl p-12 text-center transition-colors cursor-pointer",
                                isDragging ? "border-primary-500 bg-primary-50" : "border-gray-300 hover:border-primary-400 hover:bg-gray-50"
                            )}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <UploadCloud className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-1">Click to upload or drag and drop</h3>
                            <p className="text-sm text-gray-500 flex flex-col items-center">
                                <span>PDF files only (Max 10MB)</span>
                            </p>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="application/pdf"
                                className="hidden"
                            />
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                                <div className="flex items-center space-x-4">
                                    <div className="bg-primary-100 p-2 rounded-lg">
                                        <File className="h-6 w-6 text-primary-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 truncate max-w-[200px] md:max-w-md">{file.name}</p>
                                        <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                    </div>
                                </div>
                                {uploadStatus === 'idle' && (
                                    <button onClick={removeFile} className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors">
                                        <X className="h-5 w-5" />
                                    </button>
                                )}
                                {uploadStatus === 'success' && (
                                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                                )}
                            </div>

                            {uploadStatus === 'error' && (
                                <div className="p-4 bg-red-50 text-red-700 rounded-lg flex items-start gap-3 text-sm">
                                    <AlertCircle className="h-5 w-5 shrink-0" />
                                    <p>{errorMessage}</p>
                                </div>
                            )}

                            {uploadStatus === 'success' && (
                                <div className="p-4 bg-green-50 text-green-800 rounded-lg flex items-start gap-3 text-sm border border-green-200">
                                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                                    <div>
                                        <p className="font-semibold text-green-900">Upload successful!</p>
                                        <p className="mt-1">The resume has been parsed and is now searchable.</p>
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-end gap-3 pt-4 border-t">
                                {uploadStatus === 'idle' && (
                                    <>
                                        <Button variant="outline" onClick={removeFile}>Cancel</Button>
                                        <Button onClick={handleUpload}>Process Resume</Button>
                                    </>
                                )}
                                {uploadStatus === 'error' && (
                                    <>
                                        <Button variant="outline" onClick={removeFile}>Cancel</Button>
                                        <Button onClick={handleUpload}>Try Again</Button>
                                    </>
                                )}
                                {uploadStatus === 'uploading' && (
                                    <Button disabled>Parsing & Vectorizing...</Button>
                                )}
                                {uploadStatus === 'success' && (
                                    <Button onClick={removeFile} variant="outline">Upload Another</Button>
                                )}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
