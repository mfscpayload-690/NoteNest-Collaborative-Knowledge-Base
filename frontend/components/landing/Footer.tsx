"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#1A1A1A] text-[#F3F0E6] py-20 rounded-t-[3rem]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-10 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block">
              <span className="text-3xl font-serif font-bold text-[#F3F0E6]">
                NoteNest
              </span>
            </Link>
            <p className="text-[#F3F0E6]/60 max-w-xs leading-relaxed">
              Open-source knowledge base for high-performance teams. Built with love and caffeine.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#F3F0E6]/40">Product</h4>
            <ul className="space-y-3">
              <li><Link href="#features" className="text-[#F3F0E6]/80 hover:text-white transition-colors">Features</Link></li>
              <li><Link href="#roadmap" className="text-[#F3F0E6]/80 hover:text-white transition-colors">Roadmap</Link></li>
              <li><Link href="/changelog" className="text-[#F3F0E6]/80 hover:text-white transition-colors">Changelog</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#F3F0E6]/40">Resources</h4>
            <ul className="space-y-3">
              <li><Link href="/docs" className="text-[#F3F0E6]/80 hover:text-white transition-colors">Documentation</Link></li>
              <li><Link href="/api" className="text-[#F3F0E6]/80 hover:text-white transition-colors">API Reference</Link></li>
              <li><Link href="/guide" className="text-[#F3F0E6]/80 hover:text-white transition-colors">Guide</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#F3F0E6]/40">Community</h4>
            <ul className="space-y-3">
              <li><Link href="https://github.com" className="text-[#F3F0E6]/80 hover:text-white transition-colors">GitHub</Link></li>
              <li><Link href="https://discord.com" className="text-[#F3F0E6]/80 hover:text-white transition-colors">Discord</Link></li>
              <li><Link href="/blog" className="text-[#F3F0E6]/80 hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#F3F0E6]/40">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-[#F3F0E6]/80 hover:text-white transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="text-[#F3F0E6]/80 hover:text-white transition-colors">Terms</Link></li>
              <li><Link href="/cookies" className="text-[#F3F0E6]/80 hover:text-white transition-colors">Cookies</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#F3F0E6]/40">
          <p>© 2026 NoteNest. Open Source Quest.</p>
          <div className="flex items-center gap-1">
             <span>Made with</span>
             <Heart className="w-4 h-4 text-red-500 fill-current" />
             <span>by open source contributors.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
