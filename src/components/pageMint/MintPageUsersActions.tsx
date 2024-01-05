"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/src/components/components-ui/AlertDialog"
import { Button } from "@/src/components/components-ui/Button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/components-ui/Tooltip"
import axios from "axios"
import { AlertTriangle, FileEdit, Heart, Trash2 } from "lucide-react"

import { Checkbox } from "../components-ui/Checkbox"

export default function MintPageUsersActions(listingId: any) {
  const router = useRouter()

  const [disabled, setDisabled] = useState<boolean>(true)
  const handleDeleteListing = async () => {
    try {
      console.log("listingId:", listingId.listingId)
      await axios.put("/api/deleteListing/", listingId.listingId)
      router.push("/p/mymints")
      router.refresh()
      return "Listing has been successfully deleted."
    } catch (error) {
      console.error("Could not delete this listing, status:", error)
    }
  }

  return (
    <div className="w-full flex justify-end pr-5">
      <div className=" w-4/12 flex justify-end">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button className="hover:text-rose-500" variant="icon">
                <Heart />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Save</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <Button className="hover:text-amber-500" variant="icon">
                <AlertTriangle />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Report Listing</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}
