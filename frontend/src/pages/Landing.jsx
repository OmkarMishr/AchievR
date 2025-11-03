import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, Zap, BarChart3, Lock, Infinity, Sparkles } from 'lucide-react';

export default function PremiumAchievRLanding() {
  const [scrollY, setScrollY] = useState(0);
  const [hoveredFeature, setHoveredFeature] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white text-gray-900 overflow-hidden">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 backdrop-blur-md bg-white/80 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <div className="text-lg font-light tracking-wider">
            ACHIEVR
            <span className="text-xs bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent ml-2 font-semibold">Certificate System</span>
          </div>
          <div className="flex gap-8 items-center">
            <button className="text-sm text-gray-600 hover:text-gray-900 transition duration-300">Dashboard</button>
            <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-none hover:from-blue-700 hover:to-blue-600 transition duration-300 text-sm font-medium shadow-lg shadow-blue-500/20">
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-48 pb-32 px-8 relative overflow-hidden">
        <div 
          className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-transparent rounded-full blur-3xl opacity-40 animate-pulse"
          style={{ 
            transform: `translateY(${scrollY * 0.1}px)`,
            animation: 'float 6s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute top-40 left-20 w-72 h-72 bg-gradient-to-br from-blue-200 to-transparent rounded-full blur-3xl opacity-30"
          style={{ 
            transform: `translateY(${scrollY * 0.15}px)`,
            animation: 'float 8s ease-in-out infinite 1s'
          }}
        />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="mb-8 inline-block animate-fadeInDown">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-[2px] bg-blue-50 px-4 py-2 rounded-full border border-blue-200">
              <Sparkles size={12} className="inline mr-2" />
              Achievement Verification Platform
            </span>
          </div>

          <h1 className="text-7xl font-light leading-[1.1] mb-8 max-w-4xl animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            Authenticate Every Achievement.
            <span className="block font-normal bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent">Forever Verified.</span>
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mb-12 font-light leading-relaxed animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            Military-grade verification system. Blockchain-certified. Zero friction. Built for institutions that demand authenticity.
          </p>

          <div className="flex gap-6 items-center animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <button className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 transition duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105">
              <span className="font-medium text-sm">Start Verification</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
            </button>
            <button className="px-8 py-4 border-2 border-blue-400 text-blue-600 text-sm font-medium hover:bg-blue-50 transition duration-300 hover:scale-105">
              View Demo
            </button>
          </div>

          <div className="mt-16 pt-16 border-t border-gray-200 flex gap-16 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            <div className="group hover:scale-110 transition duration-300">
              <div className="text-3xl font-light mb-2 bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">2,847</div>
              <p className="text-sm text-gray-500 font-light group-hover:text-blue-600 transition">Verified Students</p>
            </div>
            <div className="group hover:scale-110 transition duration-300">
              <div className="text-3xl font-light mb-2 bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent">99.97%</div>
              <p className="text-sm text-gray-500 font-light group-hover:text-blue-600 transition">Verification Rate</p>
            </div>
            <div className="group hover:scale-110 transition duration-300">
              <div className="text-3xl font-light mb-2 bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">28ms</div>
              <p className="text-sm text-gray-500 font-light group-hover:text-blue-600 transition">Average Response</p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent" />

      {/* Problem Section */}
      <section className="py-32 px-8 bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="animate-slideInLeft">
              <h2 className="text-5xl font-light mb-8 leading-tight">
                The Problem with
                <span className="block bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent font-normal"> Traditional Verification</span>
              </h2>
              <div className="space-y-6">
                <p className="text-gray-600 font-light leading-relaxed hover:text-gray-800 transition">
                  Educational institutions lose billions annually to credential fraud. Students spend weeks on manual verification. Employers have zero trust.
                </p>
                <p className="text-gray-600 font-light leading-relaxed hover:text-gray-800 transition">
                  AchievR eliminates this friction with cryptographic certainty. Every achievement is AI-scanned, faculty-verified, and blockchain-certified within minutes.
                </p>
              </div>
            </div>
            <div className="bg-white p-12 rounded-2xl border-2 border-blue-200 shadow-xl hover:shadow-2xl transition duration-300 hover:border-blue-400 animate-slideInRight transform hover:scale-105">
              <div className="space-y-8">
                <div className="flex gap-4 group">
                  <div className="flex-shrink-0 pt-1">
                    <CheckCircle2 size={20} className="text-blue-500 group-hover:text-blue-600 transition" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 mb-1 group-hover:text-blue-600 transition">Real-time AI Validation</p>
                    <p className="text-sm text-gray-500 font-light">Document authenticity verified instantly</p>
                  </div>
                </div>
                <div className="flex gap-4 group">
                  <div className="flex-shrink-0 pt-1">
                    <Lock size={20} className="text-blue-500 group-hover:text-blue-600 transition" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 mb-1 group-hover:text-blue-600 transition">Immutable Records</p>
                    <p className="text-sm text-gray-500 font-light">Blockchain-secured certificates</p>
                  </div>
                </div>
                <div className="flex gap-4 group">
                  <div className="flex-shrink-0 pt-1">
                    <Zap size={20} className="text-blue-500 group-hover:text-blue-600 transition" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 mb-1 group-hover:text-blue-600 transition">Instant Deployment</p>
                    <p className="text-sm text-gray-500 font-light">From submission to certification in minutes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-32 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20">
            <h2 className="text-5xl font-light mb-4">Enterprise-Grade Features</h2>
            <p className="text-gray-600 font-light">Built for scale, security, and sophistication.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 border-2 border-gray-200 rounded-xl hover:border-blue-400 transition duration-300 group cursor-pointer hover:shadow-xl transform hover:scale-105" style={{ animation: `fadeInUp 0.6s ease-out 0s both` }} onMouseEnter={() => setHoveredFeature(0)} onMouseLeave={() => setHoveredFeature(null)}>
              <div className="bg-gradient-to-br from-blue-600 to-blue-500 p-3 w-fit rounded-lg mb-6 shadow-lg">
                <BarChart3 size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-medium mb-3 text-gray-900 group-hover:text-blue-700 transition">Multi-Stage Verification Pipeline</h3>
              <p className="text-sm text-gray-600 font-light leading-relaxed">
                Automated document scanning → AI fraud detection → Faculty review → Admin certification. Complete transparency at every stage.
              </p>
              {hoveredFeature === 0 && (
                <div className="mt-4 h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 rounded-full animate-pulse" />
              )}
            </div>

            <div className="p-8 border-2 border-gray-200 rounded-xl hover:border-blue-400 transition duration-300 group cursor-pointer hover:shadow-xl transform hover:scale-105" style={{ animation: `fadeInUp 0.6s ease-out 0.1s both` }} onMouseEnter={() => setHoveredFeature(1)} onMouseLeave={() => setHoveredFeature(null)}>
              <div className="bg-gradient-to-br from-blue-500 to-blue-400 p-3 w-fit rounded-lg mb-6 shadow-lg">
                <Lock size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-medium mb-3 text-gray-900 group-hover:text-blue-700 transition">Cryptographic Integrity</h3>
              <p className="text-sm text-gray-600 font-light leading-relaxed">
                SHA-256 hashing + blockchain merkle trees. Tamper-proof certificates with QR codes for public verification.
              </p>
              {hoveredFeature === 1 && (
                <div className="mt-4 h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 rounded-full animate-pulse" />
              )}
            </div>

            <div className="p-8 border-2 border-gray-200 rounded-xl hover:border-blue-400 transition duration-300 group cursor-pointer hover:shadow-xl transform hover:scale-105" style={{ animation: `fadeInUp 0.6s ease-out 0.2s both` }} onMouseEnter={() => setHoveredFeature(2)} onMouseLeave={() => setHoveredFeature(null)}>
              <div className="bg-gradient-to-br from-blue-600 to-blue-500 p-3 w-fit rounded-lg mb-6 shadow-lg">
                <Infinity size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-medium mb-3 text-gray-900 group-hover:text-blue-700 transition">Scalable Architecture</h3>
              <p className="text-sm text-gray-600 font-light leading-relaxed">
                Handles 100K+ concurrent verifications. Zero downtime. Distributed across secure infrastructure with 99.99% uptime SLA.
              </p>
              {hoveredFeature === 2 && (
                <div className="mt-4 h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 rounded-full animate-pulse" />
              )}
            </div>

            <div className="p-8 border-2 border-gray-200 rounded-xl hover:border-blue-400 transition duration-300 group cursor-pointer hover:shadow-xl transform hover:scale-105" style={{ animation: `fadeInUp 0.6s ease-out 0.3s both` }} onMouseEnter={() => setHoveredFeature(3)} onMouseLeave={() => setHoveredFeature(null)}>
              <div className="bg-gradient-to-br from-blue-500 to-blue-400 p-3 w-fit rounded-lg mb-6 shadow-lg">
                <Zap size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-medium mb-3 text-gray-900 group-hover:text-blue-700 transition">API-First Integration</h3>
              <p className="text-sm text-gray-600 font-light leading-relaxed">
                REST & GraphQL endpoints. Webhooks for real-time updates. SDKs for Node, Python, Go. Complete documentation.
              </p>
              {hoveredFeature === 3 && (
                <div className="mt-4 h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 rounded-full animate-pulse" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent" />

      {/* Testimonials */}
      <section className="py-32 px-8 bg-gradient-to-br from-white via-blue-50/20 to-blue-50/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-light mb-16">
            Trusted by
            <span className="block bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent font-normal"> Leading Institutions</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 border-2 border-gray-200 rounded-xl hover:border-blue-300 shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 group relative" style={{ animation: `fadeInUp 0.6s ease-out 0.2s both` }}>
              <div className="absolute top-0 left-0 w-1 h-16 bg-gradient-to-b from-blue-600 to-blue-500 rounded-l-xl" />
              <p className="text-gray-700 font-light mb-6 italic leading-relaxed pl-4 group-hover:text-gray-900 transition">
                "AchievR eliminated credential fraud in our placement process. Our hiring time dropped by 60%."
              </p>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-gray-900 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-blue-500 group-hover:bg-clip-text group-hover:text-transparent transition">Dr. Priya Sharma</p>
                  <p className="text-xs text-gray-500 font-light mt-1">Director, Admissions - IIT Bombay</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent uppercase tracking-wider">
                    60% faster hiring
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 border-2 border-gray-200 rounded-xl hover:border-blue-300 shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 group relative" style={{ animation: `fadeInUp 0.6s ease-out 0.3s both` }}>
              <div className="absolute top-0 left-0 w-1 h-16 bg-gradient-to-b from-blue-500 to-blue-400 rounded-l-xl" />
              <p className="text-gray-700 font-light mb-6 italic leading-relaxed pl-4 group-hover:text-gray-900 transition">
                "Students love the instant verification. We've eliminated manual documentation completely."
              </p>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-gray-900 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-blue-500 group-hover:bg-clip-text group-hover:text-transparent transition">Rajesh Patel</p>
                  <p className="text-xs text-gray-500 font-light mt-1">Dean of Students - BITS Pilani</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent uppercase tracking-wider">
                    100% automated
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-8 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-pulse" />
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h2 className="text-5xl font-light mb-6 text-white animate-fadeInUp">Ready to Transform Verification?</h2>
          <p className="text-lg text-gray-300 font-light mb-8 max-w-2xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            Join institutions securing their future with military-grade credential verification.
          </p>
          <button className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 transition duration-300 font-medium shadow-xl shadow-blue-500/50 hover:shadow-blue-500/70 hover:scale-105 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            Request Demo
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-blue-200 py-16 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <p className="font-light text-gray-900 mb-2">ACHIEVR</p>
              <p className="text-xs text-gray-500 font-light">Credential Verification System</p>
              <div className="flex gap-2 mt-4">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500" />
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-400" />
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-500" />
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-4">Product</p>
              <ul className="space-y-2 text-sm text-gray-600 font-light">
                <li><a href="#" className="hover:text-blue-600 transition">Features</a></li>
                <li><a href="#" className="hover:text-blue-600 transition">Pricing</a></li>
                <li><a href="#" className="hover:text-blue-600 transition">API</a></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-4">Company</p>
              <ul className="space-y-2 text-sm text-gray-600 font-light">
                <li><a href="#" className="hover:text-blue-600 transition">About</a></li>
                <li><a href="#" className="hover:text-blue-600 transition">Blog</a></li>
                <li><a href="#" className="hover:text-blue-600 transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-4">Legal</p>
              <ul className="space-y-2 text-sm text-gray-600 font-light">
                <li><a href="#" className="hover:text-blue-600 transition">Privacy</a></li>
                <li><a href="#" className="hover:text-blue-600 transition">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-8 text-center">
            <p className="text-xs text-gray-500 font-light">
              © 2025 AchievR. Cryptographic Verification Infrastructure.
            </p>
          </div>
        </div>
      </footer>

      {/* Animations */}
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-fadeInDown { animation: fadeInDown 0.6s ease-out; }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out; }
        .animate-slideInLeft { animation: slideInLeft 0.6s ease-out; }
        .animate-slideInRight { animation: slideInRight 0.6s ease-out; }
      `}</style>
    </div>
  );
}