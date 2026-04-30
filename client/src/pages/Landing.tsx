import { useState } from 'react';
import { Sparkles, CheckCircle2, Users, Zap } from 'lucide-react';
import AuthModal from '../components/Auth/AuthModal';

export default function Landing() {
  const [authMode, setAuthMode] = useState<'login' | 'register' | null>(null);

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Lightning Fast',
      description: 'Manage tasks with lightning-fast performance'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Team Collaboration',
      description: 'Work seamlessly with your entire team'
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: 'Track Progress',
      description: 'Monitor project progress in real-time'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Large 3D Torus Shape */}
        <div className="absolute -top-32 right-0 w-96 h-96 rounded-full border-8 border-purple-200/30 animate-float-slow" style={{
          transform: 'perspective(1200px) rotateX(45deg) rotateZ(45deg)',
        }}></div>

        {/* Floating Circle */}
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-medium"></div>

        {/* Background gradient orbs */}
        <div className="absolute -top-40 left-1/4 w-72 h-72 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob"></div>
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 backdrop-blur-md bg-white/20 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-purple-700">
                TaskFlow Pro
              </span>
            </div>

            {/* Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-purple-600 transition font-medium">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-purple-600 transition font-medium">How it works</a>
              <a href="#pricing" className="text-gray-700 hover:text-purple-600 transition font-medium">Pricing</a>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setAuthMode('login')}
                className="px-4 py-2 text-blue-900 hover:text-purple-600 transition font-semibold"
              >
                Sign In
              </button>
              <button
                onClick={() => setAuthMode('register')}
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:shadow-xl hover:shadow-purple-400/50 transition transform hover:scale-105 font-semibold"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          {/* Hero Content */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-purple-700 to-pink-600 mb-4 leading-tight">
                  The Smarter Way to Manage Tasks
                </h1>
                <p className="text-xl text-gray-700 leading-relaxed font-medium">
                  TaskFlow Pro empowers teams to collaborate, organize, and complete projects faster than ever before. Intelligent task management meets beautiful design.
                </p>
              </div>

              {/* CTA Section */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setAuthMode('register')}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full hover:shadow-2xl hover:shadow-purple-400/50 transition transform hover:scale-105"
                >
                  Start for Free
                </button>
                <button
                  onClick={() => setAuthMode('login')}
                  className="px-8 py-4 border-2 border-purple-500 text-purple-700 font-bold rounded-full hover:bg-purple-50 transition"
                >
                  Sign In
                </button>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center space-x-6 pt-4">
                <div>
                  <p className="text-sm font-bold text-gray-800">Trusted by 1000+ teams</p>
                  <div className="flex -space-x-2 mt-2">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - 3D Visual Elements */}
            <div className="relative h-96 md:h-full perspective">
              {/* Large 3D Torus (main focal point) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-80 h-80">
                  {/* Outer Torus */}
                  <div className="absolute inset-0 border-8 border-purple-200/50 rounded-full animate-float-slow" style={{
                    transform: 'perspective(1200px) rotateX(60deg) rotateZ(25deg)',
                  }}></div>

                  {/* Inner Torus */}
                  <div className="absolute inset-8 border-6 border-purple-300/40 rounded-full animate-float-slow" style={{
                    transform: 'perspective(1200px) rotateX(-40deg) rotateZ(-25deg)',
                    animationDelay: '0.5s'
                  }}></div>

                  {/* Floating Gold Sphere */}
                  <div className="absolute w-20 h-20 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full shadow-xl animate-float-gold" style={{
                    top: '20%',
                    right: '15%',
                    boxShadow: '0 20px 60px rgba(234, 179, 8, 0.4), inset -2px -2px 10px rgba(0,0,0,0.1)'
                  }}></div>

                  {/* Light Circle Accent */}
                  <div className="absolute inset-16 border-4 border-purple-100/60 rounded-full animate-spin-slow"></div>
                </div>
              </div>

              {/* Floating geometric shapes */}
              <div className="absolute top-20 left-10 w-24 h-24 border-2 border-pink-300/30 rounded-lg animate-float-slow" style={{
                transform: 'rotate(45deg)',
                animationDelay: '1s'
              }}></div>

              <div className="absolute bottom-20 right-20 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full animate-float-medium"></div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-700 font-medium">Everything you need to manage projects effectively</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-8 bg-white/50 backdrop-blur-xl rounded-2xl border border-purple-200/50 hover:border-purple-300 transition group hover:shadow-xl"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">{feature.title}</h3>
                <p className="text-gray-700 font-medium">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-gradient-to-br from-blue-900 via-purple-700 to-pink-600 rounded-3xl p-12 text-center text-white relative overflow-hidden group">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition">
              <div className="absolute top-5 right-10 w-32 h-32 border-2 border-white/20 rounded-full animate-float-slow"></div>
              <div className="absolute bottom-10 left-20 w-24 h-24 border-2 border-white/20 rounded-full animate-float-medium"></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-4">Ready to boost productivity?</h2>
              <p className="text-xl opacity-95 mb-8 max-w-2xl mx-auto font-medium">
                Join thousands of teams already using TaskFlow Pro to organize, track, and complete their projects.
              </p>
              <button
                onClick={() => setAuthMode('register')}
                className="px-8 py-4 bg-white text-purple-700 font-bold rounded-full hover:bg-gray-100 transition transform hover:scale-105"
              >
                Start Your Free Trial
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-purple-200/30 backdrop-blur-md bg-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <p className="text-gray-700 font-medium">© 2026 TaskFlow Pro. All rights reserved.</p>
            <div className="flex space-x-6 text-gray-700 font-medium">
              <a href="#" className="hover:text-purple-600 transition">Privacy</a>
              <a href="#" className="hover:text-purple-600 transition">Terms</a>
              <a href="#" className="hover:text-purple-600 transition">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authMode !== null}
        onClose={() => setAuthMode(null)}
        mode={authMode === 'login' ? 'login' : 'register'}
        onToggleMode={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
      />

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) rotateX(60deg) rotateZ(25deg);
          }
          50% {
            transform: translateY(-30px) rotateX(60deg) rotateZ(25deg);
          }
        }

        @keyframes float-medium {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float-gold {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-40px) scale(1.05);
          }
        }

        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }

        .animate-float-medium {
          animation: float-medium 5s ease-in-out infinite;
        }

        .animate-float-gold {
          animation: float-gold 4s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .perspective {
          perspective: 1200px;
        }
      `}</style>
    </div>
  );
}
