"use client"
import React from "react"

export default function MintGetStarted() {
  return (
    <div className="flex min-h-[40px] w-full items-center justify-center text-center text-sm">
      <p className="italic">
        You need to be signed in to send offers, ask questions and manage ads:{" "}
        <a
          className="w-full font-bold italic text-customAccent underline underline-offset-1"
          href="/signin"
        >
          Get Started
        </a>
      </p>
    </div>
  )
}
