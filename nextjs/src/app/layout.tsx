import { headers } from "next/headers";
import ContextProvider from "@/context";
import "./globals.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersData = await headers();
  const cookies = headersData.get("cookie");

  return (
    <html lang="en">
      <body
        className={
          "max-w-[120rem] w-[90%] mx-auto bg-background h-[100rem]"
        }
      >
        <ContextProvider cookies={cookies}>
          {children}
        </ContextProvider>
      </body>
    </html>
  );
}
