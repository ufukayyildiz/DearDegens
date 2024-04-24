import Link from "next/link"
import GIF from "@/src/assets/404.gif"
import Image from "next/image"

export default function NotFoundPage() {
  return (
    <main className="mt-20 flex h-auto w-full flex-col items-center justify-center">
      <div>
        <Image src={GIF} alt="404" className="mb-10 h-28 w-28 rounded-lg" />
      </div>
      <h1 className="mb-5 text-4xl font-bold text-customAccent">
        404 - Page Not Found
      </h1>
      <p className="mb-2 text-lg font-semibold">
        It seems you&apos;ve wondered a little off course..
      </p>
      <Link href="//" className="italic">Come back before it&apos;s too late!</Link>
    </main>
  )
}