"use client"

import React from "react"
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
import { toast } from "@/src/hooks/use-toast"
import {
  OfferCreationRequest,
  validateOffer,
} from "@/src/lib/validators/validateOffer"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useForm } from "react-hook-form"
import { z } from "zod"

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

type FormData = z.infer<typeof validateOffer>

export default function MintOffer() {
  const router = useRouter()

  // REACT-HOOK-FORM
  const form = useForm<FormData>({
    resolver: zodResolver(validateOffer),
    defaultValues: {
      price: 0,
    },
  })

  const { mutate: createPost } = useMutation({
    // PAYLOAD
    mutationFn: async ({ price }: OfferCreationRequest) => {
      const payload: OfferCreationRequest = {
        price,
      }
      const { data } = await axios.post("/api/createHousehold", payload)

      return data
    },

    // ERROR
    onError: () => {
      return toast({
        title: "Something went wrong.",
        description: "Your post was not published. Please try again.",
        variant: "destructive",
      })
    },

    // SUCCESS
    onSuccess: () => {
      router.push("/p/mymints")
      router.refresh()
      return toast({
        description: "Your post has been published.",
      })
    },
  })

  async function onSubmit(data: FormData) {
    const payload: OfferCreationRequest = {
      price: data.price,
    }
    createPost(payload)
  }

  return (
    <div className="">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="outlinebold"
          >
            MAKE OFFER
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-bold">
              Your one step closer to the deal of a lifetime!
            </AlertDialogTitle>
            <AlertDialogDescription>
              <p className="mb-5 text-primary">
                Not happy with the asking price? Send the seller an offer and
                let's see if they'll take the bait!
              </p>

              <Form {...form}>
                <form
                  className="mb-5"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <div className="flex flex-row gap-10">
                    {/* PRICE */}
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <div className="w-full h-5 flex justify-between">
                            <FormLabel className="py-1">Price </FormLabel>
                            <FormLabel className="text-xs italic text-rose-400 py-1">
                              (required)
                            </FormLabel>
                          </div>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              className="w-60"
                              required
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </form>
              </Form>

              <p className="italic text-xs">
                (Note: Once the seller has accepted your offer, you will gain
                access to the chat area where you'll make contact with the
                seller and make arrangments to complete the transaction.)
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>
              Send
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
