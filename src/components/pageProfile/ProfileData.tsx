import { userType } from "@/src/types/db"
import React, { useState, useEffect } from "react"
import { Button } from "../components-ui/Button"

interface ProfileDataProps {
  user: userType
  isFetching: boolean
  setEditCallback: (data: any) => void
}

export default function ProfileData({
  user,
  isFetching,
  setEditCallback,
}: ProfileDataProps) {
  const sendSetEditCallback = (state: any) => {
    setEditCallback(state)
  }

  return (
    <div className="space-y-5 text-primary">
      <h2 className="mb-5 font-bold text-customAccent">User Details:</h2>
      <div className="grid w-full grid-cols-1 items-center md:grid-cols-2">
        <p className="h-6 w-full font-bold">Full Name:</p>
        {isFetching ? (
          <p className="mt-1 h-10 w-60 animate-pulse rounded-full pt-2 italic text-muted-foreground md:mt-0 md:pl-3">
            James Andersen.
          </p>
        ) : (
          <p className="mt-1 h-10 w-full pt-2 italic text-muted-foreground md:mt-0 md:pl-3">
            {user[0].name}
          </p>
        )}
      </div>
      <div className="grid w-full grid-cols-1 items-center md:grid-cols-2">
        <p className="h-6 w-full font-bold">Email:</p>
        {isFetching ? (
          <p className="mt-1 h-10 w-60 animate-pulse rounded-full pt-2 italic text-muted-foreground md:mt-0 md:pl-3">
            something@domain.co.za
          </p>
        ) : (
          <p className="mt-1 h-10 w-full pt-2 italic text-muted-foreground md:mt-0 md:pl-3">
            {user[0].email}
          </p>
        )}
      </div>
      <div className="grid w-full grid-cols-1 items-center md:grid-cols-2">
        <p className="h-6 w-full font-bold">Contact Number:</p>
        {isFetching ? (
          <p className="mt-1 h-10 w-60 animate-pulse rounded-full pt-2 italic text-muted-foreground md:mt-0 md:pl-3">
            +(27) xx xxx xxxx
          </p>
        ) : (
          <p className="mt-1 h-10 w-full pt-2 italic text-muted-foreground md:mt-0 md:pl-3">
            {user[0].contact}
          </p>
        )}
      </div>
      <div className="flex w-full items-center justify-end">
        <Button variant="secondary" onClick={() => sendSetEditCallback(true)}>
          Edit
        </Button>
      </div>
    </div>
  )
}
