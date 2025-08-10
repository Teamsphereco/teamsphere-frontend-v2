"use client"

import NavBar from '@/components/navBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Users, 
  Video, 
  Shield, 
  Zap, 
  Globe,
  ArrowRight,
  CheckCircle,
  Github,
  Twitter,
  Linkedin
} from 'lucide-react';

export default function Home() {
  return (
    <div className='bg-gray-900 text-white min-h-screen'>
      <NavBar />
      
      {/* Hero Section */}
      <div className='px-8 pt-32 pb-20'>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-blue-600 hover:bg-blue-700 text-white">
              ✨ Now with AI-powered features
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              The Ultimate Communication Platform
            </h1>
            <p className='text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed'>
              At the heart of Teamsphere are channels: organized spaces for everyone
              and everything you need for work. Connect across departments, offices, 
              time zones and even other companies with seamless collaboration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                <a href="/chat" className="flex items-center gap-2">
                  Try for free
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
              <CardContent className="p-8 text-center">
                <MessageSquare className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-white">Real-time Messaging</h3>
                <p className="text-gray-300">Instant communication with rich media support, reactions, and thread conversations.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-white">Team Collaboration</h3>
                <p className="text-gray-300">Organized channels, member management, and seamless team coordination tools.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
              <CardContent className="p-8 text-center">
                <Video className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-white">Voice & Video</h3>
                <p className="text-gray-300">High-quality voice calls and video conferences with screen sharing capabilities.</p>
              </CardContent>
            </Card>
          </div>

          {/* Additional Features */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-white">Built for Modern Teams</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  <span className="text-gray-300">End-to-end encryption for secure communications</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  <span className="text-gray-300">Cross-platform support on all devices</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  <span className="text-gray-300">Advanced file sharing and collaboration tools</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  <span className="text-gray-300">Integrations with popular productivity apps</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gradient-to-br from-blue-600 to-blue-800 border-0 p-6">
                <Shield className="h-8 w-8 text-white mb-3" />
                <h4 className="font-semibold text-white mb-2">Enterprise Security</h4>
                <p className="text-blue-100 text-sm">Bank-level security protocols</p>
              </Card>
              <Card className="bg-gradient-to-br from-green-600 to-green-800 border-0 p-6">
                <Zap className="h-8 w-8 text-white mb-3" />
                <h4 className="font-semibold text-white mb-2">Lightning Fast</h4>
                <p className="text-green-100 text-sm">Optimized for speed and performance</p>
              </Card>
              <Card className="bg-gradient-to-br from-purple-600 to-purple-800 border-0 p-6">
                <Globe className="h-8 w-8 text-white mb-3" />
                <h4 className="font-semibold text-white mb-2">Global Scale</h4>
                <p className="text-purple-100 text-sm">Reliable worldwide infrastructure</p>
              </Card>
              <Card className="bg-gradient-to-br from-orange-600 to-orange-800 border-0 p-6">
                <Users className="h-8 w-8 text-white mb-3" />
                <h4 className="font-semibold text-white mb-2">Unlimited Teams</h4>
                <p className="text-orange-100 text-sm">Scale from small to enterprise</p>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-6xl mx-auto px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">Teamsphere</h3>
              <p className="text-gray-400 mb-4">
                The ultimate communication platform for modern teams and organizations.
              </p>
              <div className="flex gap-4">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Github className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Docs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Teamsphere. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
