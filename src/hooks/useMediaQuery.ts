import React, { useEffect, useState } from "react"

export default function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  // Usage: const isAboveMediumScreens = useMediaQuery("(min-width: 768px)")

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => setMatches(media.matches)
    window.addEventListener("resize", listener)
    return () => window.removeEventListener("resize", listener)
  }, [matches, query])

  return matches
}
