import { headers } from "next/headers";
import ContextProvider from "@/context";
import { Rajdhani } from "next/font/google";
import "./globals.css";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const headersData = await headers();
  const cookies = headersData.get("cookie");

  return (
    <html lang="en" className={rajdhani.className}>
      <body className="max-w-[120rem] w-[90%] mx-auto bg-background h-[100rem]">
        <ContextProvider cookies={cookies}>
          {children}
        </ContextProvider>
      </body>
    </html>
  );
}
