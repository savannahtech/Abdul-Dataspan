"use client";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SideBar from "@/components/SideBar";

const montserrat = Montserrat({ subsets: ["latin"] });

/* export const metadata: Metadata = {
  title: "Dataspan-AI",
  description: "",
}; */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <html lang="en">
      <head></head>
      <body className={montserrat.className}>
        <div>
          <div className="flex mx-auto  min-h-screen">
            <SideBar
              show={showSidebar}
              setter={setShowSidebar}
              router={router}
            />
            <div className="pt-[10px] flex-grow w-full">{children}</div>
          </div>
          {/* <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-100 h-[60px] pt-2">
            <div className="flex w-full justify-between ml-auto  mr-auto mr-auto max-w-[1500px] max-w-[1500px]:ml-auto max-w-[1400px]:mr-0">
              <div className="flex items-center">
                {!showSidebar && (
                  <button
                    className="text-4xl flex ml-3 text-primary my-auto md:hidden"
                    onClick={() => setShowSidebar(!showSidebar)}
                  >
                   
                  </button>
                )}

                <div className=" flex">
                  <div className="px-2 text-gray-500">|</div>
                </div>
              </div>
              <div className="px-4 mr-3"></div>
            </div>
          </nav> */}
        </div>
      </body>
    </html>
  );
}
