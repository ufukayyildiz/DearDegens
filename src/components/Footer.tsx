import React from "react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="absolute bottom-0 z-50 h-auto w-full bg-gradient-to-br from-grOne via-grTwo to-grThr p-5">
      <div className="mb-2 flex h-full w-full flex-col justify-between gap-2 md:flex-row">
        <div className="flex h-full w-full items-end">
          <p className="flex w-full justify-center text-center">
            support@deardegens.com
          </p>
        </div>

        <div className="flex h-full w-full flex-col items-end justify-end gap-2">
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
          <Link
            href="/disclaimer"
            className="flex w-full justify-center text-center"
          >
            Disclaimer
          </Link>
        </div>
      </div>

      <p className="my-auto h-auto w-full justify-center text-center text-xs">
        Copyright © 2024 - Developed by{" "}
        <a href="https://www.buidl.co.za" target="_blank" rel="noreferrer">
          Buidl.co.za
        </a>{" "}
        | All rights reserved
      </p>
    </footer>
  )
}
