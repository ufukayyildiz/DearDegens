import React from "react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="absolute w-full h-32 bg-gradient-to-br from-grOne via-grTwo to-grThr bottom-0 z-50 p-5">
      <div className="w-full h-full flex flex-col md:flex-row justify-between">
        <div className="flex h-full w-full items-end justify-center">
          <p className="flex w-full text-center justify-center">
            support@deardegens.com
          </p>
        </div>
        <div className="flex h-full w-full items-end justify-center">
          <Link
            href="/"
            className="flex w-full text-center justify-center font-bold"
          >
            DearDegens (Pty) Ltd
          </Link>
        </div>
        <div className="flex flex-col h-full w-full items-end justify-end gap-5">
          <Link
            href="/termsofservice"
            className="flex w-full text-center justify-center"
          >
            Terms of Service
          </Link>
          <Link
            href="/privacypolicy"
            className="flex w-full text-center justify-center"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  )
}
