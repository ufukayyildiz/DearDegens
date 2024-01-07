"use client";

import React, { useState } from "react";
import { FC, ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SessionProvider } from "next-auth/react"

interface LayoutProps {
  children: ReactNode
}

const Providers: FC<LayoutProps> = ({ children }) => {

  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>{children}</SessionProvider>
    </QueryClientProvider>
  )
}

export default Providers
