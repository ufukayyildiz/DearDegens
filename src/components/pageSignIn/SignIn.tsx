import Image from "next/image"
import Logo from "@/src/assets/deardegens2.png"

import UserAuthForm from "./UserAuthForm"

const SignIn = () => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-10 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center items-center">
        <div>
          <Image
            alt="logo"
            src={Logo}
            className="mb-10 rounded-3xl bg-white p-10"
          />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Welcome!</h1>
        <p className="mx-auto max-w-xs text-sm">
          By continuing, you are setting up a DearDegens account and agree to
          our User Agreement and Privacy Policy.
        </p>
      </div>
      <UserAuthForm />
    </div>
  )
}

export default SignIn
