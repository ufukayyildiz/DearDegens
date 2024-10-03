import React, { useState } from "react"
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
import { Button } from "../components-ui/Button"
import { Checkbox } from "../components-ui/Checkbox"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { toast } from "@/src/hooks/use-toast"
import { useQueryClient } from "@tanstack/react-query"
import { Trash2 } from "lucide-react"
import { offerType } from "@/src/types/db"
import { queryType } from "@/src/types/db"

interface MintQueryDeleteProps {
  query: queryType
}

export default function MintQueryDelete({ query }: MintQueryDeleteProps) {
  const [disabled, setDisabled] = useState<boolean>(true)
  const queryClient = useQueryClient()

  const { mutate: handleDeleteQuery } = useMutation({
    mutationFn: async (query: queryType) => {
      const payload = {
        queryId: query.id,
        querySellerId: query.sellerId,
        queryUserId: query.userId,
        queryAdId: query.adId,
      }
      await axios.put("/api/deleteQuery", payload)
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 401) {
        return toast({
          title: "Authentication Error.",
          description: "Unauthorised, please login.",
          variant: "destructive",
        })
      }
      if (error.response?.status === 429) {
        return toast({
          title: "Too Many Requests.",
          description: "Please wait 30sec before trying again.",
          variant: "destructive",
        })
      }
      if (error.response?.status === 500) {
        return toast({
          title: "Something went wrong.",
          description: "We were unable to delete this query. Please try again.",
          variant: "destructive",
        })
      }
    },
    onSuccess: () => {
      setDisabled(true)
      return toast({
        title: "Success!",
        description: "Successfully deleted query.",
      })
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log("onSettled error:", error)
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["authorQueries"],
        })
      }
    },
  })

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className="flex h-8 w-8 items-center justify-center rounded-full text-secondary hover:text-red-500">
            <Trash2 className="h-5 w-5" />
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this query?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This query will be permanently
              deleted, after which the user who sent the query will be notified.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <div className="flex w-full flex-col justify-between gap-5 md:flex-row">
              <div className="flex items-center justify-start space-x-2">
                <Checkbox
                  id="disable"
                  checked={!disabled}
                  onCheckedChange={() => setDisabled(!disabled)}
                />
                <label
                  htmlFor="disable"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Confirm deletion of query.
                </label>
              </div>
              <div>
                <AlertDialogTrigger asChild>
                  <Button
                    onClick={() => handleDeleteQuery(query)}
                    disabled={disabled}
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogCancel
                  className="ml-5"
                  onClick={() => setDisabled(true)}
                >
                  Cancel
                </AlertDialogCancel>
              </div>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
