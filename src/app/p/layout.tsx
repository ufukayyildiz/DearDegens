import "../../styles/globals.css"
import { SiteHeader } from "@/src/components/SiteHeader"

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head></head>
        <body>
          <div className="flex w-full flex-col">
            {/* @ts-expect-error Server Component */}
            <SiteHeader />
            <div className="flex-1">{children}</div>
          </div>
        </body>
      </html>
    </>
  )
}
