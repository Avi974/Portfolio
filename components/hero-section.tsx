"use client"

import { useState, useEffect, useRef } from "react"

function TypewriterText() {
  const textRef = useRef<HTMLSpanElement>(null)
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)

  const texts = [
    { text: "Frontend Developer", color: "text-blue-400" },
    { text: "Creative Designer", color: "text-purple-400" }
  ]

  const currentTextObj = texts[currentIndex]
  const currentText = currentTextObj.text

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (isWaiting) {
      timeout = setTimeout(() => {
        setIsWaiting(false)
        setIsDeleting(true)
      }, 2000) // Wait 2 seconds before deleting
    } else if (isDeleting) {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(prev => prev.slice(0, -1))
        }, 50) // Delete speed
      } else {
        setIsDeleting(false)
        setCurrentIndex(prev => (prev + 1) % texts.length)
      }
    } else {
      if (displayText.length < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayText(prev => currentText.slice(0, prev.length + 1))
        }, 100) // Type speed
      } else {
        setIsWaiting(true)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, isWaiting, currentText, texts.length])

  return (
    <span>
      <span className={currentTextObj.color}>
        {displayText}
      </span>
      <span className="typewriter-cursor">&nbsp;</span>
      {!isDeleting && displayText === currentText && (
        <span className="text-gray-300"></span>
      )}
    </span>
  )
}

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section id="home" className="min-h-screen pt-24 pb-16 px-6 bg-black relative overflow-hidden section-professional">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 grid-pattern opacity-10"></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-black/60"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-purple-400/40 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-cyan-400/20 rounded-full animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">

          {/* Left Column - Main Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

            {/* Role Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-full backdrop-blur-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300 font-medium">Available for new projects</span>
            </div>

            {/* Main Heading */}
          <div>
  <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
    <span className="text-white block">Hello, I'm</span>
    <span className=" block">
      <span
        className=" bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
        style={{
          backgroundSize: "200% 100%",
        }}
      >
        Abhik Anand
      </span>
    </span>
  </h1>

  <div className="text-xl lg:text-2xl text-gray-300 font-light mb-8">
    <TypewriterText />
  </div>
</div>


            {/* Description */}
            <p className="text-lg text-gray-400 leading-relaxed max-w-xl">
              Crafting exceptional digital experiences through innovative design and cutting-edge development. 
              I transform ideas into stunning, functional web applications that drive results.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => {
                  const element = document.querySelector('#work')
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium rounded-xl transition-all duration-300 cursor-hover glow-blue overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View My Work
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </button>

              <button 
                onClick={() => {
                  const element = document.querySelector('#contact')
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className="px-8 py-4 border border-gray-600 hover:border-blue-400/50 text-gray-300 hover:text-white font-medium rounded-xl transition-all duration-300 cursor-hover hover:bg-blue-900/10 backdrop-blur-sm"
              >
                Get In Touch
              </button>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center gap-8 pt-8 border-t border-gray-800/50">
              <div>
                <div className="text-2xl font-bold text-white">3+</div>
                <div className="text-sm text-gray-400">Projects Done</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">1+</div>
                <div className="text-sm text-gray-400">Years Experience</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">2+</div>
                <div className="text-sm text-gray-400">Happy Clients</div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Element */}
          <div className={`relative transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="relative">
              {/* Main Visual Container */}
              <div className="relative w-80 h-80 mx-auto">
                {/* Rotating Ring */}
                <div className="absolute inset-0 border-2 border-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full animate-spin-slow"></div>
                <div className="absolute inset-4 border border-cyan-400/30 rounded-full animate-reverse-spin-slow"></div>

                {/* Center Avatar/Logo Area - Using outer circle space */}
                <div className="absolute inset-8 rounded-full overflow-hidden backdrop-blur-xl border-2 border-gradient-to-br from-blue-400 to-purple-600 shadow-2xl">
                  <img 
                    src="/portfolio.jpg" 
                    alt="Abhik Anand" 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 right-8 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-2xl backdrop-blur-sm border border-white/10 flex items-center justify-center animate-float">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>

                <div className="absolute -bottom-4 left-8 w-14 h-14 bg-gradient-to-br from-purple-400/20 to-cyan-400/20 rounded-2xl backdrop-blur-sm border border-white/10 flex items-center justify-center animate-float-delayed">
                  <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <div className="text-sm text-gray-400 mb-2">Scroll to explore</div>
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  )
}