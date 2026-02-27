import { ArrowRight, Sparkles, BarChart, ShieldCheck } from 'lucide-react';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            {/* Navigation - Systra dark navy */}
            <nav style={{ backgroundColor: '#223240' }} className="sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary-500 text-white p-1.5 flex items-center justify-center">
                            <Sparkles size={20} />
                        </div>
                        <span className="text-xl font-bold text-white tracking-widest uppercase"
                            style={{ fontFamily: "'Fjalla One', sans-serif" }}>
                            INTELLIGENCE<span className="text-primary-400">AI</span>
                        </span>
                    </div>
                    <div className="hidden md:flex gap-8 text-sm font-medium text-white/70">
                        <a href="#features" className="hover:text-white transition-colors uppercase tracking-wide text-xs">Features</a>
                        <a href="#how-it-works" className="hover:text-white transition-colors uppercase tracking-wide text-xs">How it Works</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <a href="/.auth/login/aad?post_login_redirect_uri=/dashboard"
                            className="text-sm font-medium text-white/70 hover:text-white uppercase tracking-wide">
                            Log in
                        </a>
                        <a href="/.auth/login/aad?post_login_redirect_uri=/dashboard"
                            className="bg-primary-500 hover:bg-primary-600 text-white px-5 py-2 text-sm font-bold uppercase tracking-wide transition-colors">
                            Get Started
                        </a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-28 pb-36 overflow-hidden">
                <div className="absolute inset-0 -z-10" style={{
                    background: 'linear-gradient(135deg, #fdf2f4 0%, #ffffff 50%, #f8f8f8 100%)'
                }}></div>
                {/* Systra-style accent bar */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-500"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-50 text-primary-700 text-xs font-bold uppercase tracking-widest mb-8 border border-primary-100">
                        <Sparkles size={14} />
                        <span>Semantic Matching v2.0</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-8 leading-tight"
                        style={{ fontFamily: "'Fjalla One', sans-serif", textTransform: 'uppercase' }}>
                        Hire the top 1% faster
                        <br className="hidden md:block" />
                        with <span className="text-primary-500">AI precision</span>.
                    </h1>

                    <p className="mt-4 text-xl text-gray-600 max-w-2xl mb-10 leading-relaxed">
                        Stop keyword searching. Start semantic matching. Resume Intelligence AI analyzes context to find the perfect candidate for your job description instantly.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                        <a href="/.auth/login/aad?post_login_redirect_uri=/dashboard"
                            className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 text-base font-bold uppercase tracking-wide transition-colors">
                            Sign in with Azure <ArrowRight className="h-4 w-4" />
                        </a>
                        <button className="inline-flex items-center gap-2 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-4 text-base font-bold uppercase tracking-wide transition-colors">
                            Book a Demo
                        </button>
                    </div>
                </div>
            </section>

            {/* Stats Banner */}
            <section style={{ backgroundColor: '#223240' }} className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        {[
                            { value: '10x', label: 'Faster Candidate Screening' },
                            { value: '94%', label: 'AI Matching Accuracy' },
                            { value: '< 30s', label: 'Resume Processing Time' },
                        ].map((stat, i) => (
                            <div key={i} className="text-white">
                                <div className="text-4xl font-extrabold text-primary-400 mb-2"
                                    style={{ fontFamily: "'Fjalla One', sans-serif" }}>
                                    {stat.value}
                                </div>
                                <div className="text-sm text-white/60 uppercase tracking-widest">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 uppercase"
                            style={{ fontFamily: "'Fjalla One', sans-serif" }}>
                            Why enterprise teams choose IntelligenceAI
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">Built for scale, precision, and recruiter efficiency.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Semantic Matching", desc: "Understands the context of skills and experience, not just exact keywords.", icon: Sparkles },
                            { title: "Deep Analytics", desc: "Gain insights into your talent pool and track matching accuracy over time.", icon: BarChart },
                            { title: "Enterprise Security", desc: "Azure AD SSO, bank-grade encryption, and GDPR compliant.", icon: ShieldCheck }
                        ].map((feature, i) => (
                            <div key={i} className="bg-white p-8 shadow-sm hover:shadow-md transition-shadow border-t-4 border-t-primary-500">
                                <div className="h-12 w-12 bg-primary-50 text-primary-600 flex items-center justify-center mb-6">
                                    <feature.icon size={24} />
                                </div>
                                <h3 className="text-xl font-semibold mb-3 uppercase"
                                    style={{ fontFamily: "'Fjalla One', sans-serif" }}>
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                                <div className="mt-4 text-primary-500 font-bold text-sm flex items-center gap-1">
                                    Learn more <ArrowRight size={14} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden" style={{ backgroundColor: '#223240' }}>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <div className="text-xs font-bold uppercase tracking-widest text-primary-400 mb-4">Ready to get started?</div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 uppercase"
                        style={{ fontFamily: "'Fjalla One', sans-serif" }}>
                        Transform your hiring today
                    </h2>
                    <p className="text-white/60 text-lg mb-10">Join forward-thinking companies using AI to build their dream teams.</p>
                    <a href="/.auth/login/aad?post_login_redirect_uri=/dashboard"
                        className="inline-block bg-primary-500 hover:bg-primary-600 text-white px-10 py-4 text-lg font-bold uppercase tracking-wide transition-colors">
                        Get Started — It's Free
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 py-12 text-center text-gray-400">
                <p>© 2026 Resume Intelligence AI. All rights reserved.</p>
            </footer>
        </div>
    );
}
