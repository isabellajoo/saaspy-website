"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const [isDark, setIsDark] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    
    // Check localStorage and system preference
    const savedTheme = localStorage.getItem('theme')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark)
    
    setIsDark(shouldBeDark)
    
    if (shouldBeDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => {
    const html = document.documentElement
    const newIsDark = !isDark
    
    setIsDark(newIsDark)
    
    if (newIsDark) {
      html.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      console.log('Switched to dark mode')
    } else {
      html.classList.remove('dark')
      localStorage.setItem('theme', 'light')
      console.log('Switched to light mode')
    }
  }

  if (!mounted) {
    return (
      <Button 
        variant="outline" 
        size="icon" 
        disabled 
        className="border bg-gray-100 border-gray-300"
      >
        <Sun className="h-[1.2rem] w-[1.2rem] text-gray-700" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={toggleTheme}
      className="border transition-colors"
      style={{
        backgroundColor: isDark ? '#1f2937' : '#f3f4f6',
        borderColor: isDark ? '#374151' : '#d1d5db'
      }}
    >
      <Sun 
        className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" 
        style={{
          color: isDark ? '#ffffff' : '#374151'
        }}
      />
      <Moon 
        className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" 
        style={{
          color: isDark ? '#ffffff' : '#374151'
        }}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
} 