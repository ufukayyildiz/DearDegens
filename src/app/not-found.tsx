import Link from "next/link"
import GIF from "@/src/assets/404.gif"
import Image from "next/image"

export default function NotFoundPage() {
  return (
    <main>
      <div className="mt-10 flex min-h-screen w-full flex-col items-center px-8 md:mt-20">
        <div>
          <Image src={GIF} alt="404" className="mb-10 h-28 w-28 rounded-lg" />
        </div>
        <h1 className="mb-5 flex text-center text-2xl font-bold text-customAccent md:text-4xl">
          404 - Page Not Found
        </h1>
        <p className="mb-2 text-center text-lg font-semibold">
          It seems you&apos;ve wondered a little off course..
        </p>
        <Link href="//" className="italic">
          Come back before it&apos;s too late!
        </Link>
      </div>
    </main>
  )
}
