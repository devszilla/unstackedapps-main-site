import { motion, useMotionValue } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Technologies actually used in this project with official logos available
// logosNeedingInvert: logos that are black/dark and need to be inverted in dark mode
const technologiesWithLogos = [
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", needsInvert: false },
  { name: "React Router", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/reactrouter.svg", needsInvert: true },
  { name: "Next.js", logo: "/logos/next-js.svg", needsInvert: false },
  { name: "NextAuth.js", logo: "https://next-auth.js.org/img/logo/logo-sm.png", needsInvert: false },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", needsInvert: false },
  { name: "Vite", logo: "https://vitejs.dev/logo.svg", needsInvert: false },
  { name: "Tailwind CSS", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg", needsInvert: false },
  { name: "shadcn/ui", logo: "https://avatars.githubusercontent.com/u/139895814?s=48&v=4", needsInvert: false },
  { name: "Radix UI", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/radixui.svg", needsInvert: true },
  { name: "Framer Motion", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/framer.svg", needsInvert: true },
  { name: "Lucide React", logo: "https://lucide.dev/logo.svg", needsInvert: false },
  { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", needsInvert: true },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", needsInvert: false },
  { name: "Chrome Extensions", logo: "/logos/chrome-ext.svg", needsInvert: false },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", needsInvert: false },
  { name: "Drizzle", logo: "/logos/drizzle.png", needsInvert: false },
  { name: "Gemini", logo: "/logos/gemini.png", needsInvert: false },
  { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", needsInvert: false },
  { name: "Redis", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg", needsInvert: false },
  { name: "Zod", logo: "/logos/zod.png", needsInvert: false },
  { name: "Prettier", logo: "https://prettier.io/icon.png", needsInvert: false },
  { name: "ESLint", logo: "/logos/eslint.png", needsInvert: false },
]

export function LogoCarousel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const logoItemRef = useRef<HTMLDivElement>(null)
  const [itemWidth, setItemWidth] = useState(80) // Default desktop width

  useEffect(() => {
    // Calculate actual item width (logo + gap)
    const updateItemWidth = () => {
      if (logoItemRef.current) {
        const rect = logoItemRef.current.getBoundingClientRect()
        const gap = window.innerWidth >= 640 ? 32 : 16 // sm:gap-8 = 32px, gap-4 = 16px
        setItemWidth(rect.width + gap)
      }
    }
    
    updateItemWidth()
    window.addEventListener('resize', updateItemWidth)
    return () => window.removeEventListener('resize', updateItemWidth)
  }, [])

  const oneSetWidth = technologiesWithLogos.length * itemWidth

  useEffect(() => {
    if (oneSetWidth === 0) return

    let animationFrame: number
    let startTime: number | null = null
    const duration = 45000 // 45 seconds in milliseconds

    const animate = (currentTime: number) => {
      if (startTime === null) {
        startTime = currentTime
      }

      const elapsed = currentTime - startTime
      const progress = (elapsed % duration) / duration
      const currentX = -progress * oneSetWidth

      x.set(currentX)

      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [x, oneSetWidth])

  // Create enough duplicates to ensure seamless loop
  const duplicatedTechnologies = [
    ...technologiesWithLogos,
    ...technologiesWithLogos,
    ...technologiesWithLogos,
  ]

  return (
    <TooltipProvider>
      <div className="relative w-full overflow-hidden py-8">
        {/* Left fade gradient - subtle fade to transparent */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-r from-background via-background/50 to-transparent z-10 pointer-events-none" />
        
        {/* Right fade gradient - subtle fade to transparent */}
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-l from-background via-background/50 to-transparent z-10 pointer-events-none" />
        
        <motion.div
          ref={containerRef}
          className="flex gap-4 sm:gap-8"
          style={{ x }}
        >
          {duplicatedTechnologies.map((tech, index) => (
            <Tooltip key={`${tech.name}-${index}`}>
              <TooltipTrigger asChild>
                <motion.div
                  ref={index === 0 ? logoItemRef : null}
                  className="flex-shrink-0 flex items-center justify-center cursor-pointer"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative p-2 rounded-lg bg-muted/70 hover:bg-muted/80 dark:bg-muted/50 dark:hover:bg-muted/60 transition-colors">
                    <img
                      src={tech.logo}
                      alt={tech.name}
                      className={`h-12 w-12 sm:h-16 sm:w-16 opacity-80 hover:opacity-100 transition-opacity ${
                        tech.needsInvert ? 'dark:brightness-0 dark:invert' : ''
                      }`}
                      loading="lazy"
                    />
                  </div>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{tech.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </motion.div>
      </div>
    </TooltipProvider>
  )
}

