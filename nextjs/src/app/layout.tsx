import Nav from "@/components/nav/Nav";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"bg-background"}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
