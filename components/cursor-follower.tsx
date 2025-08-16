
"use client"

import { useState, useEffect, useCallback } from "react"

export default function CursorFollower() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY })
    if (!isVisible) setIsVisible(true)
  }, [isVisible])

  const handleMouseEnter = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement
    
    if (!target || !target.closest) return

    const isInteractive = 
      target.closest("button") ||
      target.closest("a") ||
      target.closest("[role='button']") ||
      target.classList?.contains("cursor-hover")

    if (isInteractive) {
      setIsHovering(true)
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
  }, [])

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseenter", handleMouseEnter, { capture: true })
    document.addEventListener("mouseleave", handleMouseLeave, { capture: true })

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseenter", handleMouseEnter, { capture: true })
      document.removeEventListener("mouseleave", handleMouseLeave, { capture: true })
    }
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave])

  return (
    <div
      className={`fixed pointer-events-none z-[9999] transition-all duration-300 ease-out flex items-center justify-center 
        ${isVisible ? "opacity-100" : "opacity-0"} 
        ${isHovering ? "w-12 h-12 border-2 border-white/40" : "w-2 h-2"}
      `}
      style={{
        left: position.x - (isHovering ? 24 : 4),
        top: position.y - (isHovering ? 24 : 4),
        backgroundColor: isHovering ? "rgba(255, 255, 255, 0.1)" : "white",
        borderRadius: "50%",
        transform: "translate3d(0, 0, 0)",
        backdropFilter: isHovering ? "blur(10px)" : "none",
      }}
    >
      {isHovering && (
        <div className="text-white text-sm">
          →
        </div>
      )}
    </div>
  )
}
