
"use client"

import { Button } from "@/components/ui/button"

export function BackToTopButton() {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="border-gray-600 text-gray-300 hover:border-purple-400 hover:text-purple-400 bg-black/80 backdrop-blur-md"
      onClick={scrollToTop}
    >
      ↑ Top
    </Button>
  )
}
