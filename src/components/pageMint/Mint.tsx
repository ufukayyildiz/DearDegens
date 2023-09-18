"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/src/hooks/use-toast"
import { AdCreationRequest, MintValidator } from "@/src/lib/validators/mint"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "../components-ui/Button"
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

type FormData = z.infer<typeof MintValidator>

export default function Mint() {
  const router = useRouter()

  // Initialise useForm
  const form = useForm<FormData>({
    resolver: zodResolver(MintValidator),
    defaultValues: {
      type: "",
      categorydoc: "",
      categorynpm: "",
      index: 0,
      title: "",
      description: "",
      content: null,
    },
  })

  const { mutate: createPost } = useMutation({
    // PAYLOAD
    mutationFn: async ({
      type,
      categorydoc,
      categorynpm,
      index,
      title,
      description,
      content,
    }: AdCreationRequest) => {
      const payload: AdCreationRequest = {
        type,
        categorydoc,
        categorynpm,
        index,
        title,
        description,
        content,
      }
      const { data } = await axios.post("/api/post/create", payload)

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
      router.push("/fs/home")

      router.refresh()

      return toast({
        description: "Your post has been published.",
      })
    },
  })

  async function onSubmit(data: FormData) {
    const payload: AdCreationRequest = {
      type: data.type,
      categorydoc: data.categorydoc,
      categorynpm: data.categorynpm,
      index: data.index,
      title: data.title,
      description: data.description,
    }
    createPost(payload)
  }

  return (
    <div className="mt-10 mx-auto w-full rounded-lg bg-background p-4">
      

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>What you we listing for you today?</FormDescription>
                <FormMessage />
              </FormItem>
              
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Good descriptions = Speedy sales!</FormDescription>
                <FormMessage />
              </FormItem>
              
            )}
          />
          <Button type="submit" variant="outline">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}
