"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [isScrolled, setIsScrolled] = useState(false);
  const [loadingButtons, setLoadingButtons] = useState<Set<string>>(new Set());

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile menu when Escape is pressed (keyboard shortcut)
  useEffect(() => {
    const handleEsc = () => setMobileMenuOpen(false);
    window.addEventListener("shortcut-esc", handleEsc);
    return () => window.removeEventListener("shortcut-esc", handleEsc);
  }, []);

  useEffect(() => {
    // Handle scroll to show/hide scroll to top button and progress
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      setShowScrollTop(scrollTop > 300);
      setScrollProgress(scrollPercent);
      setIsScrolled(scrollTop > 10);
    };
    
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections((prev) => new Set(prev).add(entry.target.id));
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id: string, buttonId?: string) => {
    const element = document.getElementById(id);
    if (element) {
      const loadingId = buttonId || `scroll-${id}`;
      setLoadingButtons(prev => new Set(prev).add(loadingId));
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
      // Clear loading after scroll animation (approximately 800ms)
      setTimeout(() => {
        setLoadingButtons(prev => {
          const next = new Set(prev);
          next.delete(loadingId);
          return next;
        });
      }, 800);
    }
  };

  const scrollToTop = () => {
    setLoadingButtons(prev => new Set(prev).add('scroll-top'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setLoadingButtons(prev => {
        const next = new Set(prev);
        next.delete('scroll-top');
        return next;
      });
    }, 800);
  };

  const handleNavigation = (url: string, buttonId: string) => {
    setLoadingButtons(prev => new Set(prev).add(buttonId));
    // Simulate navigation delay (in real app, this would be actual navigation)
    setTimeout(() => {
      window.location.href = url;
    }, 300);
  };

  const isLoading = (buttonId: string) => loadingButtons.has(buttonId);

  return (
    <main
      className="min-h-screen relative overflow-hidden"
      style={{
        color: 'var(--color-text-primary)',
        background: 'var(--color-background)',
        backgroundImage: 'linear-gradient(135deg, rgba(59, 130, 246, 0.06) 0%, transparent 25%, transparent 75%, rgba(139, 92, 246, 0.06) 100%)'
      }}
    >
      {/* Skip to main content link for keyboard navigation */}
      <a
        href="#hero"
        className="skip-to-main"
        onFocus={(e) => {
          e.currentTarget.style.top = '0';
        }}
        onBlur={(e) => {
          e.currentTarget.style.top = '-40px';
        }}
      >
        Skip to main content
      </a>

      <div className="w-full max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-12">
      {/* Scroll Progress Indicator */}
      <div 
        className="fixed top-0 left-0 right-0 h-1 z-50 transition-opacity duration-300"
        style={{
          opacity: scrollProgress > 0 ? 1 : 0,
          background: 'linear-gradient(90deg, var(--color-info) 0%, #8b5cf6 100%)',
          transform: `scaleX(${scrollProgress / 100})`,
          transformOrigin: 'left',
          transition: 'transform 0.1s ease-out'
        }}
      ></div>
      {/* Enhanced background gradient theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-30"
          style={{ 
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.1) 50%, transparent 100%)'
          }}
        ></div>
        <div 
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-25"
          style={{ 
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(59, 130, 246, 0.1) 50%, transparent 100%)'
          }}
        ></div>
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl opacity-20"
          style={{ 
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 50%, transparent 100%)'
          }}
        ></div>
      </div>

      {/* Header */}
      <header
        className="sticky top-0 z-50 transition-all duration-300 border-b"
        style={{
          background: 'var(--color-background)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderColor: 'var(--color-border-light)',
          boxShadow: isScrolled
            ? '0 8px 16px -2px rgba(0, 0, 0, 0.12), 0 4px 8px -1px rgba(0, 0, 0, 0.08)'
            : '0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.04)'
        }}
      >
        <div
          className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8"
          style={{
            paddingTop: 'clamp(var(--space-sm), 2vw, var(--space-lg))',
            paddingBottom: 'clamp(var(--space-sm), 2vw, var(--space-lg))'
          }}
        >
          <div className="flex items-center justify-between w-full" style={{ alignItems: 'center', width: '100%', gap: 0 }}>
            {/* Logo Section - Left */}
            <Link
              href="/"
              className="group flex items-center transition-all duration-300 hover:scale-105 active:scale-95"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{
                minWidth: 'fit-content',
                alignItems: 'center',
                flexShrink: 0,
                marginLeft: 'var(--space-lg)'
              }}
            >
              <div className="flex flex-col items-start justify-center" style={{ lineHeight: '1.2' }}>
                <h1 
                  className="font-bold tracking-tight transition-all duration-300"
                  style={{ 
                    fontSize: 'clamp(var(--font-size-xl), 4vw, var(--font-size-3xl))',
                    fontWeight: 'var(--font-weight-bold)',
                    background: 'linear-gradient(135deg, var(--color-info) 0%, #8b5cf6 50%, var(--color-info) 100%)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: 'gradient-shift 3s ease infinite',
                    lineHeight: '1.2',
                    letterSpacing: '-0.02em',
                    margin: 0,
                    padding: 0,
                    display: 'block'
                  }}
                >
                  NoteNest
                </h1>
                <p 
                  className="font-medium transition-all duration-200 group-hover:opacity-80 hidden sm:block"
                  style={{ 
                    color: 'var(--color-text-secondary)',
                    fontSize: 'clamp(var(--font-size-xs), 2vw, var(--font-size-sm))',
                    fontWeight: 'var(--font-weight-medium)',
                    marginTop: 'clamp(0.125rem, 0.5vw, 0.25rem)',
                    lineHeight: '1.4',
                    margin: 0,
                    padding: 0,
                    display: 'block',
                    whiteSpace: 'nowrap'
                  }}
                >
            Collaborative Knowledge Base for Teams
          </p>
              </div>
            </Link>
            
            {/* Navigation Section - Right */}
            <div className="flex items-center" style={{ gap: 'clamp(var(--space-md), 2vw, var(--space-lg))', alignItems: 'center', flexShrink: 0, marginLeft: 'auto' }}>
              <nav 
                className="hidden md:flex items-center"
                style={{ 
                  gap: 'clamp(var(--space-lg), 3vw, var(--space-xl))',
                  alignItems: 'center',
                  height: '100%',
                  flexShrink: 0
                }}
              >
              <button
                onClick={() => scrollToSection('features', 'scroll-features-nav')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    scrollToSection('features', 'scroll-features-nav');
                  }
                }}
                disabled={isLoading('scroll-features-nav')}
                aria-busy={isLoading('scroll-features-nav')}
                className={`btn-nav relative group flex items-center justify-center text-underline ${isLoading('scroll-features-nav') ? 'loading' : ''}`}
                style={{ 
                  fontSize: 'clamp(var(--font-size-sm), 2vw, var(--font-size-base))',
                  whiteSpace: 'nowrap',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center'
                }}
                aria-label="Navigate to Features section"
              >
                Features
                <span 
                  className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-4/5 rounded-full"
                  style={{ borderRadius: '2px' }}
                ></span>
              </button>
              <Link 
                href="/login" 
                className="link-nav relative group flex items-center justify-center text-underline"
                style={{ 
                  fontSize: 'clamp(var(--font-size-sm), 2vw, var(--font-size-base))',
                  whiteSpace: 'nowrap',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                Sign In
                <span 
                  className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-4/5 rounded-full"
                  style={{ borderRadius: '2px' }}
                ></span>
              </Link>
              <Link 
                href="/login" 
                className="link-primary button-ripple button-glow magnetic-button group flex items-center justify-center"
                style={{ 
                  fontSize: 'clamp(var(--font-size-sm), 2vw, var(--font-size-base))',
                  minWidth: '120px',
                  minHeight: '44px',
                  height: '44px'
                }}
              >
                <span className="relative z-10 whitespace-nowrap">Get Started</span>
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                ></div>
                <div 
                  className="absolute inset-0 button-shimmer opacity-0 group-hover:opacity-100"
                ></div>
              </Link>
              </nav>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="btn-icon md:hidden flex-shrink-0 flex items-center justify-center transition-colors duration-200 hover:bg-blue-500/10 hover:text-[var(--color-info)]"
                style={{ 
                  height: '44px',
                  width: '44px',
                  flex: '0 0 auto',
                  color: 'var(--color-text-secondary)'
                }}
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
              <svg 
                className="w-6 h-6 transition-transform duration-300 shrink-0" 
                style={{ transform: mobileMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
                fill="none" 
                stroke="currentColor" 
                strokeWidth={2.25}
                viewBox="0 0 24 24"
                aria-hidden
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
              </button>
            </div>
            
            {/* Mobile Menu */}
            <nav 
              className={`md:hidden border-t transition-all duration-300 overflow-hidden ${
                mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
              style={{ 
                borderColor: 'var(--color-border-light)',
                marginTop: mobileMenuOpen ? 'var(--space-md)' : '0',
                paddingTop: mobileMenuOpen ? 'var(--space-md)' : '0',
                paddingBottom: mobileMenuOpen ? 'var(--space-md)' : '0',
                background: 'var(--color-background)',
                backdropFilter: 'blur(10px)',
                width: '100%'
              }}
            >
              <div 
                className="flex flex-col"
                style={{ gap: 'clamp(var(--space-sm), 2vw, var(--space-md))' }}
              >
                <button
                  onClick={() => scrollToSection('features', 'scroll-features-mobile')}
                  disabled={isLoading('scroll-features-mobile')}
                  aria-busy={isLoading('scroll-features-mobile')}
                  className={`btn-nav text-left px-4 py-3 ${isLoading('scroll-features-mobile') ? 'loading' : ''}`}
                  style={{ 
                    fontSize: 'clamp(var(--font-size-sm), 2vw, var(--font-size-base))',
                    minHeight: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: isLoading('scroll-features-mobile') ? 'wait' : 'pointer'
                  }}
                >
                  Features
                </button>
                <Link 
                  href="/login"
                  className="link-nav px-4 py-3"
                  style={{ 
                    fontSize: 'clamp(var(--font-size-sm), 2vw, var(--font-size-base))',
                    minHeight: '44px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  Sign In
                </Link>
                <Link 
                  href="/login"
                  className="link-primary text-center"
                  style={{ 
                    fontSize: 'clamp(var(--font-size-sm), 2vw, var(--font-size-base))',
                    padding: 'clamp(0.75rem, 3vw, 0.875rem) clamp(1rem, 4vw, 1.25rem)',
                    minHeight: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 'var(--space-xs)'
                  }}
                >
                  Get Started
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative"
        style={{
          paddingTop: 'clamp(2rem, 8vw, 6rem)',
          paddingBottom: 'clamp(2.5rem, 10vw, 8rem)'
        }}
      >
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="mx-auto w-full" style={{ maxWidth: '1200px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h2 className="leading-tight text-center" style={{ fontSize: 'clamp(2rem, 7vw, 4rem)', fontWeight: 'var(--font-weight-bold)', lineHeight: 1.05, marginBottom: 'clamp(2rem, 6vw, 4rem)', width: '100%' }}>
                <span style={{ color: 'var(--color-text-primary)', display: 'block' }}>Capture, Organize &</span>
                <span style={{ display: 'block', marginTop: 'clamp(var(--space-sm), 2vw, var(--space-md))', background: 'linear-gradient(135deg, var(--color-info) 0%, #8b5cf6 50%, #a855f7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontSize: '0.8em' }}>Share Knowledge</span>
              </h2>

              <p className="text-center" style={{ color: 'var(--color-text-secondary)', fontSize: 'clamp(1.125rem, 2.6vw, 1.375rem)', lineHeight: 1.7, maxWidth: '1100px', marginBottom: 'clamp(var(--space-2xl), 5vw, var(--space-3xl))' }}>
                NoteNest helps teams document ideas, decisions, and learnings in a shared, searchable space. Build your team's collective intelligence.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full" style={{ maxWidth: '1000px' }}>
                <button onClick={() => handleNavigation('/notes?new=1', 'create-note')} disabled={isLoading('create-note')} aria-busy={isLoading('create-note')} className={`btn-primary group flex items-center justify-center`} style={{ fontSize: 'clamp(1rem, 2.2vw, 1.25rem)', padding: 'clamp(1.125rem, 3.2vw, 1.5rem) clamp(2.25rem, 6.5vw, 3rem)', minHeight: '60px', minWidth: '260px', borderRadius: 12 }} aria-label={isLoading('create-note') ? 'Loading...' : 'Create your first note'}>
                  <span className="relative z-10">Create Your First Note</span>
                </button>

                <button onClick={() => scrollToSection('features')} disabled={isLoading('scroll-features')} aria-busy={isLoading('scroll-features')} className="group relative rounded-xl font-semibold flex items-center justify-center" style={{ border: '2px solid var(--color-info)', color: 'var(--color-info)', padding: 'clamp(0.875rem, 2.5vw, 1rem) clamp(1.75rem, 5vw, 2rem)', minHeight: '48px', minWidth: '200px' }}>
                  <span>Learn More</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-6 mt-12" style={{ maxWidth: '900px' }}>
                <div className="flex items-center gap-3 rounded-lg" style={{ background: 'var(--color-background)', border: '1px solid var(--color-border-light)', padding: '0.75rem 1rem' }}>
                  <div style={{ width: 10, height: 10, borderRadius: 9999, background: 'var(--color-success)' }}></div>
                  <span style={{ color: 'var(--color-text-primary)', fontWeight: 'var(--font-weight-semibold)' }}>Trusted by teams worldwide</span>
                </div>

                <div className="flex items-center gap-3 rounded-lg" style={{ background: 'var(--color-background)', border: '1px solid var(--color-border-light)', padding: '0.75rem 1rem' }}>
                  <svg className="w-5 h-5" style={{ color: 'var(--color-info)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  <span style={{ color: 'var(--color-text-primary)', fontWeight: 'var(--font-weight-semibold)' }}>Enterprise-grade security</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="relative scroll-mt-20 overflow-hidden"
        style={{
          background: 'var(--color-background)',
          backgroundImage: 'linear-gradient(135deg, rgba(59, 130, 246, 0.04) 0%, transparent 50%, rgba(139, 92, 246, 0.04) 100%)',
          paddingTop: 'clamp(var(--space-3xl), 8vw, var(--space-4xl))',
          paddingBottom: 'clamp(var(--space-3xl), 8vw, var(--space-4xl))',
          borderTop: '1px solid var(--color-border-light)',
          borderBottom: '1px solid var(--color-border-light)'
        }}
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-0 left-1/4 w-80 h-80 rounded-full blur-3xl opacity-25"
            style={{
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.35) 0%, transparent 70%)'
            }}
          ></div>
          <div
            className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-25"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, transparent 70%)'
            }}
          ></div>
        </div>

        <div
          className="max-w-7xl mx-auto relative z-10 w-full px-4 sm:px-6 lg:px-8"
        >
          <div 
            className={`transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ 
              marginBottom: 'var(--space-3xl)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                marginBottom: 'var(--space-xl)'
              }}
            >
              <h3
                className="rounded-2xl relative overflow-hidden group"
                style={{
                  background: 'linear-gradient(135deg, var(--color-info) 0%, #8b5cf6 100%)',
                  color: 'white',
                  fontSize: 'clamp(var(--font-size-2xl), 4vw, var(--font-size-4xl))',
                  fontWeight: 'var(--font-weight-bold)',
                  paddingTop: 'var(--space-lg)',
                  paddingBottom: 'var(--space-lg)',
                  paddingLeft: 'clamp(var(--space-lg), 5vw, var(--space-2xl))',
                  paddingRight: 'clamp(var(--space-lg), 5vw, var(--space-2xl))',
                  boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.03)',
                  transition: 'all 0.2s ease',
                  lineHeight: '1.2',
                  letterSpacing: '-0.02em',
                  display: 'inline-block',
                  width: 'auto',
                  maxWidth: '100%',
                  textAlign: 'center',
                  margin: 'var(--space-lg) auto 0 auto'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 15px 35px -5px rgba(59, 130, 246, 0.5), 0 6px 10px -2px rgba(59, 130, 246, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(59, 130, 246, 0.4), 0 4px 6px -2px rgba(59, 130, 246, 0.3)';
                }}
              >
                <span className="relative z-10 inline-block">What NoteNest Enables</span>
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                ></div>
          </h3>
            </div>
            <p 
              className="font-medium"
              style={{ 
                color: 'var(--color-text-secondary)',
                fontSize: 'clamp(var(--font-size-lg), 2vw, var(--font-size-xl))',
                maxWidth: '720px',
                lineHeight: '1.7',
                marginTop: 0,
                fontWeight: 'var(--font-weight-medium)',
                letterSpacing: '-0.01em',
                textAlign: 'center',
                width: '100%',
                marginLeft: 'auto',
                marginRight: 'auto'
              }}
            >
              Everything you need to build and share knowledge with your team
            </p>
          </div>

          <div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center w-full"
            style={{ gap: 'clamp(var(--space-lg), 4vw, var(--space-2xl))', paddingLeft: 'clamp(var(--space-md), 3vw, var(--space-2xl))', paddingRight: 'clamp(var(--space-md), 3vw, var(--space-2xl))' }}
          >
            <Feature
              icon="📝"
              title="Collaborative Notes"
              text="Write and edit notes together in real time. See changes as they happen and never lose context."
              delay="300"
              mounted={mounted}
            />
            <Feature
              icon="📂"
              title="Organized Spaces"
              text="Group notes by projects, teams, or topics. Keep everything organized and easy to find."
              delay="400"
              mounted={mounted}
            />
            <Feature
              icon="🔍"
              title="Powerful Search"
              text="Quickly find information when you need it. Search across all your notes instantly."
              delay="500"
              mounted={mounted}
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        id="benefits"
        className="relative overflow-hidden"
        style={{
          paddingTop: 'clamp(var(--space-3xl), 8vw, var(--space-4xl))',
          paddingBottom: 'clamp(var(--space-3xl), 8vw, var(--space-4xl))',
          background: 'var(--color-background)',
          backgroundImage: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, transparent 50%, rgba(139, 92, 246, 0.05) 100%)'
        }}
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.45) 0%, transparent 70%)'
            }}
          ></div>
          <div
            className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.45) 0%, transparent 70%)'
            }}
          ></div>
        </div>

        <div
          className="max-w-7xl mx-auto relative z-10 w-full px-4 sm:px-6 lg:px-8"
        >
          <div
            className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-16 xl:gap-20"
          >
            <div className={`w-full max-w-lg text-center lg:text-left transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`} style={{ paddingLeft: 'var(--space-lg)' }}>
              <div className="inline-block mb-6">
                <span 
                  className="inline-flex items-center rounded-lg transition-all duration-200 hover:opacity-90 border uppercase tracking-wide"
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)',
                    color: 'var(--color-info)',
                    fontSize: 'var(--font-size-xs)',
                    letterSpacing: '0.1em',
                    borderColor: 'rgba(59, 130, 246, 0.2)',
                    fontWeight: 'var(--font-weight-semibold)',
                    boxShadow: '0 1px 2px rgba(59, 130, 246, 0.06)',
                    padding: 'var(--space-sm) var(--space-lg)',
                    minHeight: '2.25rem',
                    lineHeight: 1.4
                  }}
                >
                  Built for Everyone
                </span>
              </div>
              <h3 
                className="mb-6"
                style={{ 
                  fontSize: 'clamp(var(--font-size-3xl), 5vw, var(--font-size-5xl))',
                  fontWeight: 'var(--font-weight-bold)',
                  lineHeight: '1.15',
                  letterSpacing: '-0.025em',
                  marginBottom: 'var(--space-xl)'
                }}
              >
                <span style={{ color: 'var(--color-text-primary)' }}>
                  Built for{" "}
                </span>
                <span 
                  className="inline-block"
                  style={{ 
                    color: '#8b5cf6',
                    background: 'linear-gradient(135deg, var(--color-info) 0%, #8b5cf6 50%, var(--color-info) 100%)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: 'gradient-shift 3s ease infinite'
                  }}
                >
                  Modern Teams
                </span>
              </h3>
              <p 
                className="leading-relaxed mb-8"
                style={{ 
                  color: 'var(--color-text-secondary)',
                  fontSize: 'clamp(var(--font-size-lg), 2vw, var(--font-size-xl))',
                  lineHeight: '1.75',
                  fontWeight: 'var(--font-weight-medium)',
                  marginBottom: 'var(--space-2xl)',
                  letterSpacing: '-0.01em'
                }}
              >
                NoteNest combines the best of documentation tools with real-time collaboration. 
                Whether you're a startup or an <strong style={{ color: 'var(--color-text-primary)' }}>enterprise</strong>, we've got you covered.
              </p>
              <ul 
                style={{ gap: 'var(--space-lg)' }} 
                className="flex flex-col"
              >
                <li 
                  className="group flex items-start transition-all duration-300 hover:translate-x-2"
                  style={{ gap: 'var(--space-lg)' }}
                >
                  <div 
                    className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-md"
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0.25) 100%)',
                      border: '2px solid var(--color-success)'
                    }}
                  >
                    <span 
                      className="text-2xl font-bold"
                      style={{ color: 'var(--color-success)' }}
                    >
                      ✓
                    </span>
                  </div>
                  <span 
                    className="text-lg font-semibold pt-1.5 transition-colors duration-300 group-hover:opacity-90"
                    style={{ 
                      color: 'var(--color-text-primary)',
                      lineHeight: '1.6',
                      fontSize: 'var(--font-size-lg)',
                      fontWeight: 'var(--font-weight-semibold)',
                      letterSpacing: '-0.01em'
                    }}
                  >
                    Real-time collaboration with live cursors
                  </span>
                </li>
                <li 
                  className="group flex items-start transition-all duration-300 hover:translate-x-2"
                  style={{ gap: 'var(--space-lg)' }}
                >
                  <div 
                    className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-md"
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0.25) 100%)',
                      border: '2px solid var(--color-success)'
                    }}
                  >
                    <span 
                      className="text-2xl font-bold"
                      style={{ color: 'var(--color-success)' }}
                    >
                      ✓
                    </span>
                  </div>
                  <span 
                    className="text-lg font-semibold pt-1.5 transition-colors duration-300 group-hover:opacity-90"
                    style={{ 
                      color: 'var(--color-text-primary)',
                      lineHeight: '1.6',
                      fontSize: 'var(--font-size-lg)',
                      fontWeight: 'var(--font-weight-semibold)',
                      letterSpacing: '-0.01em'
                    }}
                  >
                    Rich text editing with markdown support
                  </span>
                </li>
                <li 
                  className="group flex items-start transition-all duration-300 hover:translate-x-2"
                  style={{ gap: 'var(--space-lg)' }}
                >
                  <div 
                    className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-md"
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0.25) 100%)',
                      border: '2px solid var(--color-success)'
                    }}
                  >
                    <span 
                      className="text-2xl font-bold"
                      style={{ color: 'var(--color-success)' }}
                    >
                      ✓
                    </span>
                  </div>
                  <span 
                    className="text-lg font-semibold pt-1.5 transition-colors duration-300 group-hover:opacity-90"
                    style={{ 
                      color: 'var(--color-text-primary)',
                      lineHeight: '1.6',
                      fontSize: 'var(--font-size-lg)',
                      fontWeight: 'var(--font-weight-semibold)',
                      letterSpacing: '-0.01em'
                    }}
                  >
                    Version history and change tracking
                  </span>
                </li>
              </ul>
            </div>
            <div className={`relative w-full max-w-lg mx-auto lg:mx-0 transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-4 scale-95'}`}>
              <div 
                className="rounded-2xl relative overflow-hidden"
                style={{ 
                  background: 'var(--color-background)',
                  padding: 'clamp(var(--space-lg), 4vw, var(--space-2xl))',
                  border: '1px solid var(--color-border-light)',
                  boxShadow: '0 2px 8px -2px rgba(0, 0, 0, 0.06), 0 1px 3px -1px rgba(0, 0, 0, 0.03)'
                }}
              >
                {/* Stats Grid */}
          <div
            className="grid grid-cols-2 gap-6 lg:gap-8"
          >
                  <StatCard
                    number="10K+"
                    label="Active Teams"
                    icon="👥"
                    delay="0"
                    mounted={mounted}
                  />
                  <StatCard
                    number="50K+"
                    label="Notes Created"
                    icon="📝"
                    delay="100"
                    mounted={mounted}
                  />
                  <StatCard
                    number="99.9%"
                    label="Uptime"
                    icon="⚡"
                    delay="200"
                    mounted={mounted}
                  />
                  <StatCard
                    number="24/7"
                    label="Support"
                    icon="💬"
                    delay="300"
                    mounted={mounted}
                  />
                </div>
                
                {/* Additional Info */}
                <div 
                  className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t text-center"
                  style={{ borderColor: 'var(--color-border-light)' }}
                >
                  <p 
                    className="text-xs sm:text-sm font-medium mb-2"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    Trusted by teams at
                  </p>
                  <div className="flex items-center justify-center gap-3 sm:gap-6 flex-wrap">
                    <div className="text-lg sm:text-2xl font-bold" style={{ color: 'var(--color-text-muted)' }}>TechCorp</div>
                    <div className="w-1 h-1 rounded-full hidden sm:block" style={{ background: 'var(--color-text-muted)' }}></div>
                    <div className="text-lg sm:text-2xl font-bold" style={{ color: 'var(--color-text-muted)' }}>StartupXYZ</div>
                    <div className="w-1 h-1 rounded-full hidden sm:block" style={{ background: 'var(--color-text-muted)' }}></div>
                    <div className="text-lg sm:text-2xl font-bold" style={{ color: 'var(--color-text-muted)' }}>DevTeam</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        id="cta"
        className="relative overflow-hidden"
          style={{ 
            paddingTop: 'clamp(3rem, 8vw, 6rem)',
            paddingBottom: 'clamp(3rem, 8vw, 6rem)',
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.04) 0%, rgba(99, 102, 241, 0.03) 25%, rgba(139, 92, 246, 0.04) 50%, rgba(99, 102, 241, 0.03) 75%, rgba(59, 130, 246, 0.04) 100%)',
            borderTop: '1px solid var(--color-border-light)',
            borderBottom: '1px solid var(--color-border-light)',
            position: 'relative'
          }}
      >
        {/* Decorative background elements */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            background: 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.06) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.06) 0%, transparent 50%)'
          }}
        />
        
        <div 
          className="mx-auto w-full relative z-10"
          style={{ 
            maxWidth: '1280px',
            paddingLeft: 'var(--space-xl)',
            paddingRight: 'var(--space-xl)',
            paddingTop: 'var(--space-lg)',
            paddingBottom: 'var(--space-lg)'
          }}
        >
          <div 
            className={`flex flex-col items-center justify-center text-center transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ width: '100%' }}
          >
            <h3 
              className="mb-6"
              style={{ 
                color: 'var(--color-text-primary)',
                fontSize: 'clamp(var(--font-size-3xl), 5vw, var(--font-size-5xl))',
                fontWeight: '800',
                lineHeight: '1.15',
                letterSpacing: '-0.025em',
                marginBottom: 'var(--space-xl)',
                width: '100%',
                textAlign: 'center'
              }}
            >
              Ready to Get Started?
            </h3>
            <p 
              className="mb-10"
              style={{ 
                color: 'var(--color-text-secondary)',
                fontSize: 'clamp(var(--font-size-lg), 2.5vw, var(--font-size-xl))',
                maxWidth: '720px',
                lineHeight: '1.75',
                fontWeight: 'var(--font-weight-medium)',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginBottom: 'var(--space-3xl)',
                letterSpacing: '-0.01em',
                textAlign: 'center',
                width: '100%'
              }}
            >
              Join teams worldwide who are already using NoteNest to build their collective intelligence.
            </p>
            <div 
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4"
              style={{ 
                maxWidth: '600px',
                marginLeft: 'auto',
                marginRight: 'auto',
                width: '100%'
              }}
            >
              <Link
                href="/login"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('/login', 'get-started-cta');
                }}
                aria-busy={isLoading('get-started-cta')}
                className={`link-primary button-ripple button-glow magnetic-button group text-center flex items-center justify-center w-full sm:w-auto transition-all duration-300 hover:scale-105 active:scale-95 ${isLoading('get-started-cta') ? 'loading' : ''}`}
                style={{
                  fontSize: 'clamp(var(--font-size-base), 2vw, var(--font-size-lg))',
                  padding: 'clamp(1rem, 3vw, 1.25rem) clamp(2rem, 5vw, 2.5rem)',
                  boxShadow: '0 12px 32px -6px rgba(59, 130, 246, 0.5), 0 6px 12px -3px rgba(59, 130, 246, 0.4)',
                  minWidth: 'clamp(200px, 35vw, 250px)',
                  minHeight: '56px',
                  flex: '1 1 auto',
                  cursor: isLoading('get-started-cta') ? 'wait' : 'pointer',
                  opacity: isLoading('get-started-cta') ? 0.75 : 1,
                  borderRadius: '12px'
                }}
              >
                <span className="relative z-10">Get Started for Free</span>
                <div className="absolute inset-0 button-shimmer opacity-0 group-hover:opacity-100"></div>
              </Link>
              <button
                onClick={() => scrollToSection('features', 'scroll-features-cta')}
                disabled={isLoading('scroll-features-cta')}
                aria-busy={isLoading('scroll-features-cta')}
                className={`btn-secondary button-ripple magnetic-button text-center flex items-center justify-center w-full sm:w-auto ${isLoading('scroll-features-cta') ? 'loading' : ''}`}
                style={{ 
                  fontSize: 'clamp(var(--font-size-base), 2vw, var(--font-size-lg))',
                  padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem)',
                  minWidth: 'clamp(180px, 30vw, 220px)',
                  minHeight: '44px',
                  flex: '1 1 auto',
                  cursor: isLoading('scroll-features-cta') ? 'wait' : 'pointer',
                  opacity: isLoading('scroll-features-cta') ? 0.75 : 1
                }}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer
        id="footer"
        className="relative border-t"
        style={{
          background: 'linear-gradient(135deg, var(--color-gray-900) 0%, #1a1a2e 100%)',
          borderColor: 'var(--color-gray-700)',
          color: 'var(--color-gray-300)',
          marginTop: 'var(--space-4xl)',
          borderTopWidth: '2px'
        }}
      >
        <div
          className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8"
          style={{
            paddingTop: 'clamp(var(--space-3xl), 8vw, var(--space-4xl))',
            paddingBottom: 'clamp(var(--space-3xl), 8vw, var(--space-4xl))'
          }}
        >
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 xl:gap-16 mb-12 lg:mb-16 xl:mb-20"
          >
            <div>
              <h4
                className="font-bold"
                style={{
                  color: 'var(--color-gray-50)',
                  fontSize: 'var(--font-size-lg)',
                  marginBottom: 'var(--space-md)',
                  marginLeft: 'var(--space-lg)'
                }}
              >
                NoteNest
              </h4>
              <p
                className="text-sm"
                style={{
                  color: 'var(--color-gray-400)',
                  lineHeight: 'var(--line-height-relaxed)',
                  marginLeft: 'var(--space-lg)'
                }}
              >
                Collaborative knowledge base for modern teams
              </p>
            </div>
            <div>
              <h5 
                className="font-semibold"
                style={{ 
                  color: 'var(--color-gray-50)',
                  marginBottom: 'var(--space-md)'
                }}
              >
                Product
              </h5>
              <ul 
                className="text-sm flex flex-col"
                style={{ 
                  color: 'var(--color-gray-400)',
                  gap: 'var(--space-sm)'
                }}
              >
                <li><Link href="#" className="hover:opacity-70 transition-opacity">Features</Link></li>
                <li><Link href="#" className="hover:opacity-70 transition-opacity">Pricing</Link></li>
                <li><Link href="#" className="hover:opacity-70 transition-opacity">Roadmap</Link></li>
              </ul>
            </div>
            <div>
              <h5 
                className="font-semibold"
                style={{ 
                  color: 'var(--color-gray-50)',
                  marginBottom: 'var(--space-md)'
                }}
              >
                Company
              </h5>
              <ul 
                className="text-sm flex flex-col"
                style={{ 
                  color: 'var(--color-gray-400)',
                  gap: 'var(--space-sm)'
                }}
              >
                <li><Link href="#" className="hover:opacity-70 transition-opacity">About</Link></li>
                <li><Link href="#" className="hover:opacity-70 transition-opacity">Blog</Link></li>
                <li><Link href="#" className="hover:opacity-70 transition-opacity">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h5 
                className="font-semibold"
                style={{ 
                  color: 'var(--color-gray-50)',
                  marginBottom: 'var(--space-md)'
                }}
              >
                Resources
              </h5>
              <ul 
                className="text-sm flex flex-col"
                style={{ 
                  color: 'var(--color-gray-400)',
                  gap: 'var(--space-sm)'
                }}
              >
                <li><Link href="#" className="hover:opacity-70 transition-opacity">Documentation</Link></li>
                <li><Link href="#" className="hover:opacity-70 transition-opacity">Support</Link></li>
                <li><Link href="#" className="hover:opacity-70 transition-opacity">Community</Link></li>
              </ul>
            </div>
          </div>
          <div 
            className="border-t flex flex-col sm:flex-row justify-between items-center gap-4"
            style={{ 
              borderColor: 'var(--color-gray-700)',
              paddingTop: 'clamp(var(--space-lg), 4vw, var(--space-xl))'
            }}
          >
            <div className="text-sm" style={{ color: 'var(--color-gray-400)' }}>
              <span className="font-bold" style={{ color: 'var(--color-gray-50)' }}>NoteNest</span> • Open Source Quest Project
            </div>
            <div className="text-xs" style={{ color: 'var(--color-gray-500)' }}>
              Built with Next.js and Tailwind CSS
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
         <button
           onClick={scrollToTop}
           disabled={isLoading('scroll-top')}
           aria-busy={isLoading('scroll-top')}
           className={`fixed rounded-full shadow-2xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 group button-ripple button-glow cta-pulse ${isLoading('scroll-top') ? 'loading' : ''}`}
          style={{
            background: 'linear-gradient(135deg, var(--color-info) 0%, #8b5cf6 100%)',
            color: 'white',
            padding: 'clamp(0.75rem, 2vw, 1rem)',
            minWidth: '44px',
            minHeight: '44px',
            width: '44px',
            height: '44px',
            boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.5), 0 4px 6px -2px rgba(59, 130, 246, 0.3)',
            cursor: 'pointer',
            bottom: 'clamp(1rem, 4vw, 2rem)',
            right: 'clamp(1rem, 4vw, 2rem)',
            zIndex: 9999,
            position: 'fixed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-label="Scroll to top"
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 15px 35px -5px rgba(59, 130, 246, 0.6), 0 6px 10px -2px rgba(59, 130, 246, 0.4), 0 0 30px rgba(59, 130, 246, 0.4)';
            e.currentTarget.style.transform = 'scale(1.15) translateY(-3px)';
            e.currentTarget.style.cursor = 'pointer';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(59, 130, 246, 0.5), 0 4px 6px -2px rgba(59, 130, 246, 0.3)';
            e.currentTarget.style.transform = 'scale(1) translateY(0)';
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'scale(0.9) translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px -2px rgba(59, 130, 246, 0.4), 0 2px 4px -1px rgba(59, 130, 246, 0.3)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'scale(1.15) translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 15px 35px -5px rgba(59, 130, 246, 0.6), 0 6px 10px -2px rgba(59, 130, 246, 0.4), 0 0 30px rgba(59, 130, 246, 0.4)';
          }}
        >
          <svg 
            className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:-translate-y-1 icon-bounce" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
      </div>
    </main>
  );
}

function Feature({ 
  icon, 
  title, 
  text, 
  delay, 
  mounted 
}: { 
  icon: string; 
  title: string; 
  text: string; 
  delay: string;
  mounted: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      className={`group relative rounded-2xl transition-all duration-300 overflow-hidden card-enter ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{ 
        transitionDelay: `${delay}ms`,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0.005) 100%)',
        border: `1.5px solid ${isHovered ? 'rgba(59, 130, 246, 0.35)' : 'rgba(59, 130, 246, 0.1)'}`,
        boxShadow: isHovered 
          ? '0 20px 40px -10px rgba(59, 130, 246, 0.15), 0 8px 16px -4px rgba(0, 0, 0, 0.1)'
          : '0 8px 20px -8px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.05)',
        transform: isHovered ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
        padding: 'clamp(var(--space-lg), 4vw, var(--space-2xl))',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'default',
        minHeight: '360px',
        maxWidth: '360px',
        width: '100%'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="article"
      aria-label={title}
    >
      {/* Enhanced gradient overlay on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.03) 50%, rgba(59, 130, 246, 0.05) 100%)',
          transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      ></div>
      
      {/* Shine effect on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.5) 50%, transparent 100%)',
          transform: 'translateX(-100%)',
          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateX(100%)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateX(-100%)';
        }}
      ></div>
      
      {/* Glow effect on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none rounded-2xl"
        style={{
          background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
          transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      ></div>

      <div className="relative z-10">
        {/* Icon container with enhanced styling */}
        <div 
          className="relative inline-block mb-6"
        >
          <div 
            className="transform transition-all duration-500 rounded-2xl p-4"
            style={{ 
              fontSize: 'clamp(2.5rem, 8vw, 3.5rem)',
              transform: isHovered ? 'scale(1.2) rotate(10deg)' : 'scale(1) rotate(0deg)',
              background: isHovered 
                ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)'
                : 'transparent',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              padding: 'clamp(0.75rem, 2vw, 1rem)'
            }}
          >
            {icon}
    </div>
        </div>
        
        <h4 
          className="font-bold transition-all duration-300 mb-4"
          style={{ 
            color: isHovered ? 'var(--color-info)' : 'var(--color-text-primary)',
            fontSize: 'clamp(var(--font-size-xl), 3vw, var(--font-size-2xl))',
            fontWeight: 'var(--font-weight-bold)',
            transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
            lineHeight: '1.3',
            letterSpacing: '-0.015em',
            marginBottom: 'var(--space-lg)'
          }}
        >
          {title}
        </h4>
        <div className="relative">
          <p 
            className="leading-relaxed transition-colors duration-300"
            style={{ 
              color: isHovered ? 'var(--color-text-secondary)' : 'var(--color-text-muted)',
              fontSize: 'clamp(var(--font-size-base), 1.5vw, var(--font-size-lg))',
              lineHeight: '1.7',
              letterSpacing: '-0.01em',
              paddingRight: '2rem',
              marginBottom: 0
            }}
          >
            {text}
          </p>
          
          {/* Decorative arrow on hover - positioned at end of text */}
          <div 
            className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-all duration-300 inline-flex items-center icon-bounce"
            style={{ 
              color: 'var(--color-info)',
              transform: 'translateX(-4px)',
              marginLeft: '0.5rem',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
      </div>
    </article>
  );
}

function StatCard({ 
  number, 
  label, 
  icon, 
  delay, 
  mounted 
}: { 
  number: string; 
  label: string; 
  icon: string;
  delay: string;
  mounted: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`group relative text-center transition-all duration-300 overflow-hidden card-enter ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        style={{ 
          transitionDelay: `${delay}ms`,
          padding: 'clamp(var(--space-md), 3vw, var(--space-lg))',
          background: 'var(--color-background)',
          borderRadius: 'var(--space-md)',
          border: `1px solid ${isHovered ? 'var(--color-border-medium)' : 'var(--color-border-light)'}`,
          boxShadow: isHovered
          ? '0 2px 8px -2px rgba(0, 0, 0, 0.06), 0 1px 3px -1px rgba(0, 0, 0, 0.04)'
          : '0 1px 2px 0 rgba(0, 0, 0, 0.04), 0 1px 3px 0 rgba(0, 0, 0, 0.02)',
          transform: isHovered ? 'translateY(-1px)' : 'translateY(0)',
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'default'
        }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="article"
      aria-label={`${number} ${label}`}
    >
      {/* Gradient overlay on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-md"
        style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.03) 50%, rgba(59, 130, 246, 0.05) 100%)',
          transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      ></div>
      
      {/* Glow effect on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none rounded-md"
        style={{
          background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
          transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      ></div>
      
      <div className="relative z-10">
        <div 
          className="text-4xl mb-2 transition-transform duration-300 icon-bounce"
          style={{
            transform: isHovered ? 'scale(1.2) rotate(8deg)' : 'scale(1) rotate(0deg)',
            transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'inline-block'
          }}
        >
          {icon}
        </div>
        <div 
          className="font-bold mb-1 transition-all duration-300"
          style={{ 
            fontSize: 'var(--font-size-3xl)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--color-text-primary)',
            background: 'linear-gradient(135deg, var(--color-info) 0%, #8b5cf6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            transform: isHovered ? 'scale(1.1) translateY(-2px)' : 'scale(1) translateY(0)',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'inline-block'
          }}
        >
          {number}
        </div>
        <div 
          className="text-sm font-medium transition-all duration-300"
          style={{ 
            color: isHovered ? 'var(--color-info)' : 'var(--color-text-secondary)',
            transform: isHovered ? 'translateY(-1px) scale(1.05)' : 'translateY(0) scale(1)',
            fontWeight: isHovered ? 'var(--font-weight-semibold)' : 'var(--font-weight-medium)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}

