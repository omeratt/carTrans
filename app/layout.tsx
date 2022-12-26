import { Montserrat } from "@next/font/google";
import Link from "next/link";
import "../styles/globals.css";
import "animate.css";
import { Providers } from "./provider";
const inter = Montserrat({ subsets: ["cyrillic"] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={inter.className}>
      <head />
      <Providers>
        <body className="bg-stone-200 h-[100%]">
          <header>
            <nav className="bg-gray-800 py-4">
              <div className="container mx-auto flex items-center justify-between px-4">
                <Link href="/" className="text-white font-bold text-xl">
                  Home
                </Link>
                <div className="flex items-center">
                  <Link
                    href="/login"
                    className="mx-2 text-white hover:text-gray-400"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="mx-2 text-white hover:text-gray-400"
                  >
                    Register
                  </Link>
                  <Link
                    href="/create-contract"
                    className="mx-2 text-white hover:text-gray-400"
                  >
                    Create Contract
                  </Link>
                </div>
              </div>
            </nav>
          </header>
          {children}
        </body>
      </Providers>
    </html>
  );
}
