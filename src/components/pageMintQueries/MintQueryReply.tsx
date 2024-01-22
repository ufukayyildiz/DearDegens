"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
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
import { toast } from "@/src/hooks/use-toast"
import {
  QueryCreationRequest,
  validateQuery,
} from "@/src/lib/validators/validateQuery"
import { getListings } from "@/src/server/actions"
import { listingsType, queryType } from "@/src/types/db"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { MessageCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Checkbox } from "../components-ui/Checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components-ui/Form"
import { Input } from "../components-ui/Input"
import { Label } from "../components-ui/Label"
import { Textarea } from "../components-ui/Textarea"

type FormData = z.infer<typeof validateQuery>

export default function MintQueryReply() {
  const queryClient = useQueryClient()
  const [disabled, setDisabled] = useState<boolean>(true)
  const { mintId }: any = useParams()

  const { data } = useQuery<listingsType[]>({
    queryKey: ["listing"],
    queryFn: () => mintId && getListings(mintId)
  })

  const listing = data && data[0]

  const form = useForm<FormData>({
    resolver: zodResolver(validateQuery),
    defaultValues: {
      query: "",
      adId: listing?.id,
      sellerId: listing?.authorId,
      adTitle: listing?.title || '',
    },
  })

  const { mutate: createQuery } = useMutation({
    // PAYLOAD
    mutationFn: async ({
      query,
      adId,
      sellerId,
      adTitle,
    }: QueryCreationRequest) => {
      const payload: QueryCreationRequest = {
        query,
        adId,
        sellerId,
        adTitle,
      }

      const { data } = await axios.post("/api/createQuery", payload)

      return data
    },
    onError: () => {
      return toast({
        title: "Something went wrong.",
        description: "There was an error sending your query. Please try again.",
        variant: "destructive",
      })
    },
    onSuccess: () => {
      return toast({
        description: "Your query is on the way to the seller.",
      })
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log("onSettled error:", error)
      } else {
        await queryClient.invalidateQueries({ queryKey: ["notify"] })
      }
    },
  })

  async function onSubmit(data: FormData) {
    const payload: QueryCreationRequest = {
      query: data.query,
      adId: listing?.id || '',
      sellerId: listing?.authorId || '',
      adTitle: listing?.title || '',
    }
    setDisabled(true)
    console.log("Submit Payload:", payload)
    createQuery(payload)
  }

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="hover:text-blue-500" variant="icon">
            <MessageCircle/>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <AlertDialogHeader>
                <AlertDialogTitle className="font-bold mb-5">
                  Have a question for the seller?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  <div className="grid grid-cols-1 gap-2 mb-5">
                    {/* QUERY */}
                    <FormField
                      control={form.control}
                      name="query"
                      render={({ field }) => (
                        <FormItem>
                          <div className="w-full h-5 flex justify-between">
                            <FormLabel className="py-1 text-primary">
                              Type your message here (Max 191 characters):
                            </FormLabel>
                            <FormLabel className="text-xs italic text-rose-400 py-1">
                              (required)
                            </FormLabel>
                          </div>
                          <FormControl>
                            <Textarea
                              {...field}
                              className="w-full text-primary"
                              required
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <p className="italic text-xs">
                      (Note: Once the seller recieves this message, they will
                      have the option of making the query public when they
                      reply. Both your message and the sellers reply will be
                      displayed on the listing page to better inform other
                      potential buyers.)
                    </p>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <div className="w-full flex justify-between">
                  <div className="flex items-center space-x-2 justify-start">
                    <Checkbox
                      id="disable"
                      checked={!disabled}
                      onCheckedChange={() => setDisabled(!disabled)}
                    />
                    <Label
                      htmlFor="disable"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      <Link href="/termsofservice" className="underline">
                        Agree to terms of service.
                      </Link>
                    </Label>
                  </div>
                  <div className="flex gap-5">
                    <AlertDialogCancel onClick={() => setDisabled(true)}>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      type="submit"
                      disabled={disabled}
                      onClick={() => onSubmit(form.getValues())}
                    >
                      Send
                    </AlertDialogAction>
                  </div>
                </div>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
