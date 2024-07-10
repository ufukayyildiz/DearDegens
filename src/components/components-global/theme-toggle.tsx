"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "../components-ui/Button"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant="icon"
      className="relative flex h-8 w-8 items-center justify-center"
      // onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="absolute hidden h-6 w-6 dark:block" />
      <Moon className=" absolute h-6 w-6 dark:hidden" />
    </Button>
  )
}
