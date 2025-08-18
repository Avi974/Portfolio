
"use client"

import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"

interface ShareButtonProps {
  title: string
  url?: string
  variant?: "outline" | "default"
  size?: "sm" | "default" | "lg"
  className?: string
  children?: React.ReactNode
}

export function ShareButton({ 
  title, 
  url,
  variant = "outline",
  size = "sm",
  className,
  children 
}: ShareButtonProps) {
  const handleShare = () => {
    if (typeof window !== 'undefined') {
      const shareUrl = url || window.location.href
      
      if (navigator.share) {
        navigator.share({
          title: title,
          url: shareUrl
        }).catch(console.error)
      } else {
        // Fallback to clipboard
        navigator.clipboard.writeText(shareUrl).then(() => {
          // You could add a toast notification here
          console.log('URL copied to clipboard')
        }).catch(console.error)
      }
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleShare}
    >
      {children || (
        <>
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </>
      )}
    </Button>
  )
}
