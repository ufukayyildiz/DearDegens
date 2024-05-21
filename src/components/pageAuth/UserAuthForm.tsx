"use client"

import * as React from "react"
import { FC } from "react"
import { useToast } from "@/src/hooks/use-toast"
import { cn } from "@/src/lib/utils"
import { signIn } from "next-auth/react"

import { Button } from "../components-ui/Button"
import { Icons } from "../components-ui/Icons"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const loginWithGoogle = async () => {
    setIsLoading(true)

    try {
      await signIn("google")
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error logging in with Google",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex justify-center", className)} {...props}>
      <Button
        type="button"
        size="sm"
        className="w-full"
        onClick={loginWithGoogle}
        disabled={isLoading}
      >
        {isLoading ? null : <Icons.google className="mr-2 h-4 w-4" />}
        Google
      </Button>
    </div>
  )
}

export default UserAuthForm
