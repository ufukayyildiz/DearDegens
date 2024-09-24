"use client"

import Link from "next/link"
import { signOut } from "next-auth/react"
import { useTheme } from "next-themes"
import { ThemeToggle } from "./components-global/theme-toggle"
import ChatSheetUser from "./pageMintChat/ChatSheetUser"
import { User } from "../types/user"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components-ui/DropdownMenu"
import { UserAvatar } from "./components-ui/UserAvatar"
import {
  Home,
  UserIcon,
  FilePlus,
  Heart,
  BookOpen,
  FileCog,
  Moon,
  Sun,
  MessageCircle,
} from "lucide-react"

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "name" | "image" | "email" | "id">
  adminId: string
}

export function UserAccountNav({ user, adminId }: UserAccountNavProps) {
  const { setTheme, theme } = useTheme()

  const userName = user?.name
  const userImage = user?.image
  const userId = user?.id

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <UserAvatar
          user={{ name: userName, image: userImage }}
          className="h-8 w-8 shadow-lg"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="relative" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-bold">{user.name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-primary">
                {user.email}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col space-y-1">
          {adminId === userId && (
            <DropdownMenuItem asChild className=" font-bold text-customAccent">
              <Link href="/command-centre">Admin Dashboard</Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem
            asChild
            className="bg-customAccent font-bold text-zinc-100 shadow-md transition duration-300 hover:scale-105"
          >
            <Link href="/subscriptions/order">GET PRO ACCESS</Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <div>
              <div className="relative flex h-8 w-8 items-center justify-center">
                <Home className="absolute h-6 w-6" />
              </div>
              <Link href="/" className="pl-2">
                Home
              </Link>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <div>
              <div className="relative flex h-8 w-8 items-center justify-center">
                <UserIcon className="absolute h-6 w-6" />
              </div>
              <Link href="/account" className="pl-2">
                Account
              </Link>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
              <ChatSheetUser/>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <div>
              <div className="relative flex h-8 w-8 items-center justify-center">
                <FilePlus className="absolute h-6 w-6" />
              </div>
              <Link href="/ad/create" className="pl-2">
                Create Ad
              </Link>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <div>
              <div className="relative flex h-8 w-8 items-center justify-center">
                <FileCog className="absolute h-6 w-6" />
              </div>
              <Link href="/ad/ads-manager" className="pl-2">
                Ads Manager
              </Link>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <div>
              <div className="relative flex h-8 w-8 items-center justify-center">
                <Heart className="absolute h-6 w-6" />
              </div>
              <Link href="/ad/mywishlist" className="pl-2">
                Wishlist
              </Link>
            </div>
          </DropdownMenuItem>

          {/* <DropdownMenuItem asChild>
            <div>
              <div className="relative flex h-8 w-8 items-center justify-center">
                <BookOpen className="absolute h-6 w-6" />
              </div>
              <Link href="/user-guide" className="pl-2">
                User Guide
              </Link>
            </div>
          </DropdownMenuItem> */}

          <DropdownMenuItem
            asChild
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <div>
              <ThemeToggle />
              <p className="pl-2 dark:hidden">Dark Mode</p>
              <p className="hidden pl-2 dark:block">Light Mode</p>
            </div>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer border-2 text-red-500 focus:border-red-500 focus:text-red-500"
          onSelect={(event) => {
            event.preventDefault()
            signOut({
              callbackUrl: `${window.location.origin}/signin`,
            })
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
