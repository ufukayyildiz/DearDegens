import React from "react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="absolute bottom-0 z-50 h-32 w-full bg-gradient-to-br from-grOne via-grTwo to-grThr p-5">
      <div className="flex h-full w-full flex-col justify-between md:flex-row">
        <div className="flex h-full w-full items-end justify-center">
          <p className="flex w-full justify-center text-center">
            support@deardegens.com
          </p>
        </div>
        <div className="flex h-full w-full items-end justify-center">
          <Link
            href="/"
            className="flex w-full justify-center text-center font-bold"
          >
            DearDegens (Pty) Ltd
          </Link>
        </div>
        <div className="flex h-full w-full flex-col items-end justify-end gap-5">
          <Link
            href="/termsofservice"
            className="flex w-full justify-center text-center"
          >
            Terms of Service
          </Link>
          <Link
            href="/privacypolicy"
            className="flex w-full justify-center text-center"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  )
}
