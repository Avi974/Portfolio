"use client"

import { useState, useEffect } from 'react'
import { Home, User, Briefcase, FolderOpen, Trophy, MessageSquare, PenTool, Mail, ChevronRight, ExternalLink } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const navigationItems = [
    { 
      name: 'Home', 
      href: '#home', 
      description: 'Back to top',
      icon: Home,
      color: 'from-blue-400 to-cyan-400'
    },
    { 
      name: 'About', 
      href: '#about', 
      description: 'Get to know me',
      icon: User,
      color: 'from-purple-400 to-pink-400'
    },
    { 
      name: 'Services', 
      href: '#what-i-do', 
      description: 'What I do',
      icon: Briefcase,
      color: 'from-green-400 to-emerald-400'
    },
    { 
      name: 'Portfolio', 
      href: '#work', 
      description: 'Recent works',
      icon: FolderOpen,
      color: 'from-orange-400 to-red-400'
    },
    { 
      name: 'Experience', 
      href: '#experience', 
      description: 'My journey',
      icon: Trophy,
      color: 'from-yellow-400 to-orange-400'
    },
    { 
      name: 'Testimonials', 
      href: '#awards', 
      description: 'Client feedback',
      icon: MessageSquare,
      color: 'from-indigo-400 to-purple-400'
    },
    { 
      name: 'Blog', 
      href: '#blog', 
      description: 'Latest articles',
      icon: PenTool,
      color: 'from-teal-400 to-blue-400'
    },
    { 
      name: 'Contact', 
      href: '#contact', 
      description: 'Let\'s connect',
      icon: Mail,
      color: 'from-pink-400 to-rose-400'
    }
  ]

  const handleMenuClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsMenuOpen(!isMenuOpen)
  }

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false)
    setActiveSection(href.replace('#', ''))

    // Smooth scroll to section
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.map(item => item.href.replace('#', ''))
      const scrollY = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 professional-card backdrop-blur-md border-b border-blue-400/20">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Abhik Anand
          </div>

          <div className="flex items-center space-x-4">
            {/* LET'S TALK Button */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick('#contact')
              }}
              className="no-cursor-text relative inline-block overflow-hidden group px-6 py-2.5 pr-[34px] bg-white/10 backdrop-blur text-white font-medium rounded-full uppercase text-sm tracking-wider"
            >
              <span className="block relative text-transparent before:absolute before:top-0 before:left-0 before:opacity-100 before:content-[attr(data-text)] before:text-white before:transition-all before:ease-out before:duration-200 group-hover:before:-top-full group-hover:before:opacity-0
                after:absolute after:top-full after:left-0 after:opacity-0 after:content-[attr(data-text)] after:text-white after:transition-all after:ease-out after:duration-200 group-hover:after:top-0 group-hover:after:opacity-100"
                data-text="LET'S TALK"
              >
                LET'S TALK
              </span>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full group-hover:bg-white/60 transition duration-300"></span>
            </a>

            {/* MENU Button */}
            <button
              onClick={handleMenuClick}
              className={`no-cursor-text relative inline-block overflow-hidden group px-8 py-2.5 font-medium rounded-full uppercase text-sm tracking-wider transition-all duration-300 ${
                isMenuOpen
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-black hover:bg-gray-100'
              }`}
            >
              <span className="block relative text-transparent before:absolute before:top-0 before:left-0 before:opacity-100 before:content-[attr(data-text)] before:transition-all before:ease-out before:duration-200 group-hover:before:-top-full group-hover:before:opacity-0
                after:absolute after:top-full after:left-0 after:opacity-0 after:content-[attr(data-text)] after:transition-all after:ease-out after:duration-200 group-hover:after:top-0 group-hover:after:opacity-100"
                data-text={isMenuOpen ? "CLOSE" : "MENU"}
                style={{ color: isMenuOpen ? 'white' : 'black' }}
              >
                {isMenuOpen ? "CLOSE" : "MENU"}
              </span>
              <span className={`absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition duration-300 ${
                isMenuOpen ? 'bg-white' : 'bg-black group-hover:bg-black/40'
              }`}></span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Menu Overlay */}
      <div className={`fixed inset-0 z-40 transition-all duration-500 ease-out ${
        isMenuOpen
          ? 'opacity-100 visible'
          : 'opacity-0 invisible'
      }`}>
        {/* Background Overlay */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div className={`absolute top-0 right-0 h-full w-full max-w-2xl professional-card transform transition-all duration-500 ease-out ${
          isMenuOpen
            ? 'translate-x-0 opacity-100'
            : 'translate-x-full opacity-0'
        }`}>
          {/* Menu Content */}
          <div className="h-full flex flex-col pt-24 pb-8 px-8 overflow-y-auto">
            {/* Menu Header */}
            <div className="mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                Navigation
              </h2>
              <p className="text-gray-400 text-lg">
                Explore my digital universe
              </p>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1">
              <ul className="space-y-3">
                {navigationItems.map((item, index) => {
                  const IconComponent = item.icon
                  const isActive = activeSection === item.href.replace('#', '')
                  const isHovered = hoveredItem === item.name

                  return (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault()
                          handleNavClick(item.href)
                        }}
                        onMouseEnter={() => setHoveredItem(item.name)}
                        onMouseLeave={() => setHoveredItem(null)}
                        className={`group relative block p-5 rounded-2xl transition-all duration-500 border-2 overflow-hidden ${
                          isActive 
                            ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400/50 shadow-lg shadow-blue-500/20' 
                            : 'hover:bg-white/5 border-transparent hover:border-white/20'
                        }`}
                        style={{
                          animationDelay: `${index * 100}ms`,
                          animation: isMenuOpen ? 'slideInRight 0.6s ease-out forwards' : 'none'
                        }}
                      >
                        {/* Background gradient effect */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                        {/* Active indicator */}
                        {isActive && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-400 rounded-r-full" />
                        )}

                        <div className="relative flex items-center justify-between">
                          <div className="flex items-center space-x-5">
                            {/* Icon with gradient background */}
                            <div className={`relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} ${
                              isActive ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'
                            } transition-all duration-300 group-hover:scale-110`}>
                              <IconComponent className="w-6 h-6 text-white" />
                              {isHovered && (
                                <div className="absolute inset-0 bg-white/20 rounded-xl animate-pulse" />
                              )}
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center space-x-3">
                                <h3 className={`text-xl font-bold transition-all duration-300 ${
                                  isActive 
                                    ? 'text-white' 
                                    : 'text-white/90 group-hover:text-white'
                                }`}>
                                  {item.name}
                                </h3>
                                {isActive && (
                                  <div className="flex items-center space-x-1">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                                    <span className="text-blue-400 text-xs font-medium">Active</span>
                                  </div>
                                )}
                              </div>
                              <p className={`text-sm transition-colors duration-300 mt-1 ${
                                isActive 
                                  ? 'text-gray-300' 
                                  : 'text-gray-400 group-hover:text-gray-200'
                              }`}>
                                {item.description}
                              </p>

                              {/* Progress bar for active section */}
                              {isActive && (
                                <div className="mt-3 w-full bg-white/10 rounded-full h-1 overflow-hidden">
                                  <div className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse" style={{ width: '70%' }} />
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Arrow with enhanced animation */}
                          <div className={`transition-all duration-300 ${
                            isActive 
                              ? 'text-blue-400 opacity-100 translate-x-1' 
                              : 'text-white/60 opacity-0 group-hover:opacity-100 group-hover:translate-x-2'
                          }`}>
                            <div className="relative">
                              <ChevronRight className="w-6 h-6" />
                              {isHovered && (
                                <div className="absolute inset-0 animate-ping">
                                  <ChevronRight className="w-6 h-6 opacity-30" />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Hover effect overlay */}
                        <div className={`absolute inset-0 border border-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                          isActive ? 'opacity-50' : ''
                        }`} />
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>

            {/* Menu Footer */}
            <div className="mt-12 pt-8 border-t border-gradient-to-r from-blue-400/20 to-purple-400/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-3 font-medium">Connect with me</p>
                  <div className="flex space-x-3">
                    {[
                      { 
                        name: 'GitHub', 
                        href: 'https://github.com/Avi974', 
                        color: 'from-gray-400 to-gray-600',
                        icon: (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.16c-3.34.72-4.03-1.61-4.03-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.24 1.83 1.24 1.07 1.83 2.8 1.3 3.48.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.51.12-3.16 0 0 1.01-.32 3.3 1.23A11.45 11.45 0 0112 5.8c1.02.01 2.04.14 3 .41 2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.86.12 3.16.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.49 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
                          </svg>
                        )
                      },
                      { 
                        name: 'LinkedIn', 
                        href: 'https://www.linkedin.com/in/abhik-anand-2b078a188/', 
                        color: 'from-blue-400 to-blue-600',
                        icon: (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zm-11 19H5V9h3v10zm-1.5-11.3c-.97 0-1.75-.79-1.75-1.75S5.53 4.2 6.5 4.2s1.75.79 1.75 1.75S7.47 7.7 6.5 7.7zM20 19h-3v-5.6c0-1.34-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95V19h-3V9h2.88v1.37h.04c.4-.75 1.36-1.54 2.8-1.54 3 0 3.56 1.97 3.56 4.53V19z"/>
                          </svg>
                        )
                      },
                      { 
                        name: 'X', 
                        href: 'https://x.com/Abhik0811281850', 
                        color: 'from-gray-400 to-gray-200',
                        icon: (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                          </svg>
                        )
                      },
                      { 
                        name: 'Instagram', 
                        href: 'https://www.instagram.com/avixoxo_7/', 
                        color: 'from-pink-400 to-rose-500',
                        icon: (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                        )
                      }
                    ].map((social) => (
                      <a 
                        key={social.name}
                        href={social.href} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 flex items-center space-x-2"
                      >
                        <div className={`text-transparent bg-gradient-to-r ${social.color} bg-clip-text group-hover:text-white transition-all duration-300`}>
                          {social.icon}
                        </div>
                        <span className={`text-sm font-medium bg-gradient-to-r ${social.color} bg-clip-text text-transparent group-hover:text-white transition-all duration-300`}>
                          {social.name}
                        </span>
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white/60" />
                        <div className={`absolute inset-0 bg-gradient-to-r ${social.color} opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300`} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick stats */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-blue-400 font-bold text-lg">1+</div>
                  <div className="text-gray-400 text-xs">Years</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-purple-400 font-bold text-lg">3+</div>
                  <div className="text-gray-400 text-xs">Projects</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-green-400 font-bold text-lg">2+</div>
                  <div className="text-gray-400 text-xs">Clients</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}