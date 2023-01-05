"use-client";
import { Montserrat } from "@next/font/google";
// import Link from "next/link";
import "../styles/globals.css";
import "animate.css";
import NavBar from "./NavBar";
import { Providers } from "./provider";
import SideBar from "./SideBar";
import Image from "next/image";
const inter = Montserrat({ subsets: ["latin"], weight: "600" });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const Bgc = () => (
    <Image
      className="-z-20"
      // width={900}
      objectFit="cover"
      // height={900}
      layout="fill"
      src="/background.jpg"
      alt="background"
    />
  );

  return (
    <Providers>
      <html className={inter.className}>
        <head />

        <body className="bg-stone-200 h-[100%]">
          <header>
            <NavBar />
          </header>
          <SideBar />
          {/* <div className="h-screen grid place-content-center">
            <div className="h-screen absolute -z-10">
            </div>
          </div> */}
          {children}
          <Bgc />
        </body>
      </html>
    </Providers>
  );
}
