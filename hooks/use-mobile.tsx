import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    // Skip if running in SSR environment
    if (typeof window === "undefined") return

    // Create a media query list
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

    // Define handler
    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches)
    }

    // Initial state
    setIsMobile(mql.matches)

    // Listen for changes
    mql.addEventListener("change", handleChange)

    // Cleanup
    return () => {
      mql.removeEventListener("change", handleChange)
    }
  }, [])

  return isMobile
}
