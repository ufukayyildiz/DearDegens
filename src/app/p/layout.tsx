import "../../styles/globals.css"
import { Metadata } from "next"
import Head from "next/head"
import { SiteHeader } from "@/src/components/SiteHeader"
import { fontSans } from "@/src/lib/fonts"
import { cn } from "@/src/lib/utils"

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Bangers&family=Bungee+Inline&family=Chivo+Mono:wght@300&family=Cinzel&family=Cinzel+Decorative&family=Fauna+One&family=Galada&family=Indie+Flower&family=Open+Sans&family=Press+Start+2P&family=Prompt:wght@400;600&family=Rampart+One&family=Sigmar+One&family=Sonsie+One&family=Urbanist:ital,wght@0,400;1,600&display=swap"
        rel="stylesheet"
      />
      <div
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <div className="flex w-full flex-col">
          {/* @ts-expect-error Server Component */}
          <SiteHeader />
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </>
  )
}
