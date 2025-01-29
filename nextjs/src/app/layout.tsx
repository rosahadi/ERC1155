import "./globals.css";
import { FloatingNav } from "@/components/ui/floating-navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={
          "max-w-[120rem] w-[90%] mx-auto bg-background h-[100rem]"
        }
      >
        <FloatingNav />
        {children}
      </body>
    </html>
  );
}
