"use client"
import React, { useState, useEffect } from "react"
import { Button } from "@/src/components/components-ui/Button"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "@/src/hooks/use-toast"
import { useSession } from "next-auth/react"
import { useQueryClient } from "@tanstack/react-query"
import { useGetUserInfo } from "@/src/server/services"
import { userType } from "@/src/types/db"
import ProfileData from "@/src/components/pageProfile/ProfileData"
import ProfileDataForm from "@/src/components/pageProfile/ProfileDataForm"

export default function Profile() {
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const [disabled, setDisabled] = useState<boolean>(false)

  const user = (useGetUserInfo().data as userType[]) || ""
  const isFetching = useGetUserInfo().isFetching

  const isGoogleAccount = () => {
    if (user && user[0].password.length > 50) {
      setDisabled(true)
    }
  }
  useEffect(() => {
    isGoogleAccount()
  }, [])

  const getSetEditCallback = (data: any) => {
    setIsEdit(data)
  }

  // EDIT PASSWORD MUTATION
  const { mutate: updatePassword } = useMutation({
    mutationFn: async (email: string) => {
      const payload = {
        email: email,
      }
      await axios.post("/api/editUpdatePassword", payload)
    },
    onError: () => {
      return toast({
        title: "Something went wrong.",
        description: "Failed to send reset password email. Please try again.",
        variant: "destructive",
      })
    },
    onSuccess: () => {
      return toast({
        title: "Success!",
        description:
          "Please check your account email for a link to change your password.",
      })
    },
  })

  return (
    <div className="z-20 mx-auto mb-52 min-h-screen w-11/12 min-w-[280px] overflow-hidden md:w-8/12">
      <h1 className="mt-10 text-xl font-bold text-primary">Profile</h1>
      <hr className="my-2 border border-t-muted-foreground" />

      {/* USER DETAILS */}
      {!isEdit ? (
        <ProfileData
          user={user}
          isFetching={isFetching}
          setEditCallback={getSetEditCallback}
        />
      ) : (
        <ProfileDataForm
          user={user}
          isFetching={isFetching}
          setEditCallback={getSetEditCallback}
        />
      )}

      <div className="flex w-full items-center justify-end"></div>
      <hr className="mb-2 mt-5 border border-t-muted-foreground" />

      {/* SECURITY */}
      <div className="space-y-5 text-primary">
        <h2 className="mb-5 font-bold text-customAccent">Security:</h2>
        <div className="grid w-full grid-cols-2">
          <Button
            variant="outlineTwo"
            onClick={() => updatePassword(user[0].email)}
            className="w-44"
            disabled={disabled}
          >
            RESET PASSWORD
          </Button>
          <p className="text-sm italic">
            Note: By clicking "RESET PASSWORD", you will be sent an email with a
            confirmation link to change your password. Once your password has
            been successfully updated, you&apos;ll be automatically logged out
            and sent to the sign in page from where you can use your new details
            to sign back in.
          </p>
        </div>
      </div>
      <hr className="mb-2 mt-5  border border-t-muted-foreground" />
    </div>
  )
}
