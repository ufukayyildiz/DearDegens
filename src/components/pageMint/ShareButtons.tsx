"use client"
import { useParams } from "next/navigation"
import React from "react"
import { Facebook } from "lucide-react"
import { FaXTwitter } from "react-icons/fa6"
import { FaWhatsapp } from "react-icons/fa"
import { Share2, ExternalLink } from "lucide-react"
import { toast } from "@/src/hooks/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/components-ui/DropdownMenu"
import { Button } from "../components-ui/Button"

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share"

interface ShareButtonProps {
  domain: string
}

export default function ShareButtons(domain: ShareButtonProps) {
  const params = useParams()
  const url = `${domain.domain}/${params?.title}/${params?.brand}/${params?.model}/${params?.subcategory}/${params?.location}/${params?.listingId}`
  return (
    <div className="items-center justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <Share2 />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-row gap-3">
          <DropdownMenuItem asChild>
            <FacebookShareButton
              url={url}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-primary"
            >
              <Facebook className="h-6 w-6 hover:text-sky-500" />
            </FacebookShareButton>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <TwitterShareButton
              url={url}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-primary"
            >
              <FaXTwitter className="h-6 w-6 hover:text-zinc-400" />
            </TwitterShareButton>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <WhatsappShareButton
              url={url}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-primary"
            >
              <FaWhatsapp className="h-7 w-7 hover:text-lime-500" />
            </WhatsappShareButton>
          </DropdownMenuItem>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(url)
                return toast({
                  description: "Copied to clipboard",
                })
              }}
              className="flex relative w-[42px] h-[42px]"
              variant="icon"
            >
              <ExternalLink className="flex absolute w-6 h-6 hover:text-customAccent"/>
            </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}