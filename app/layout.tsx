"use-client";
import { Montserrat } from "@next/font/google";
// import Link from "next/link";
import "../styles/globals.css";
import "animate.css";
import NavBar from "./NavBar";
import { Providers } from "./provider";
import SideBar from "./SideBar";

const inter = Montserrat({ subsets: ["latin-ext"] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html className={inter.className}>
        <head />
        <body className="bg-stone-200 h-[100%]">
          <header>
            <NavBar />
          </header>
          <SideBar />
          {children}
        </body>
      </html>
    </Providers>
  );
}
