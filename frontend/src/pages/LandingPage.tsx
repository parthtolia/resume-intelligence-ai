import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { ArrowRight, Sparkles, BarChart, ShieldCheck } from 'lucide-react';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            {/* Navigation */}
            <nav className="border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary-600 text-white p-1.5 rounded-lg flex items-center justify-center">
                            <Sparkles size={20} />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-gray-900">Intelligence<span className="text-primary-600">AI</span></span>
                    </div>
                    <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
                        <a href="#features" className="hover:text-primary-600 transition-colors">Features</a>
                        <a href="#how-it-works" className="hover:text-primary-600 transition-colors">How it Works</a>
                        <a href="#pricing" className="hover:text-primary-600 transition-colors">Pricing</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/dashboard" className="text-sm font-medium text-gray-600 hover:text-gray-900">Log in</Link>
                        <Button asChild>
                            <Link to="/dashboard">Get Started</Link>
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-24 pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-50 via-white to-white -z-10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-sm font-medium mb-8 border border-primary-100">
                        <Sparkles size={16} />
                        <span>Introducing Semantic Matching v2.0</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-8 leading-tight">
                        Hire the top 1% faster <br className="hidden md:block" />
                        with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">AI precision</span>.
                    </h1>

                    <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Stop keyword searching. Start semantic matching. Resume Intelligence AI analyzes context to find the perfect candidate for your job description instantly.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button size="lg" className="h-12 px-8 text-base shadow-lg shadow-primary-500/20" asChild>
                            <Link to="/dashboard">
                                Start for free <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button variant="outline" size="lg" className="h-12 px-8 text-base bg-white">
                            Book a demo
                        </Button>
                    </div>
                </div>
            </section>

            {/* Features Showcase */}
            <section id="features" className="py-24 bg-gray-50 border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Why enterprise teams choose IntelligenceAI</h2>
                        <p className="mt-4 text-lg text-gray-600">Built for scale, precision, and recruiter efficiency.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Semantic Matching", desc: "Understands the context of skills and experience, not just exact keywords.", icon: Sparkles },
                            { title: "Deep Analytics", desc: "Gain insights into your talent pool and track matching accuracy over time.", icon: BarChart },
                            { title: "Enterprise Security", desc: "Bank-grade encryption, SOC2 certified, and GDPR compliant.", icon: ShieldCheck }
                        ].map((feature, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="h-12 w-12 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center mb-6">
                                    <feature.icon size={24} />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-primary-600 -z-10 [clip-path:polygon(0_0,100%_10vw,100%_100%,0_100%)]"></div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to transform your hiring?</h2>
                    <p className="text-primary-100 text-lg mb-10">Join thousands of companies using AI to build their dream teams.</p>
                    <Button size="lg" className="bg-white text-primary-700 hover:bg-gray-50 h-14 px-8 text-lg font-semibold" asChild>
                        <Link to="/dashboard">Get Started Today</Link>
                    </Button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 border-t border-gray-800 py-12 text-center text-gray-400">
                <p>© 2026 Resume Intelligence AI. All rights reserved.</p>
            </footer>
        </div>
    );
}
