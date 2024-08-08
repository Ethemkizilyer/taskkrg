import "./globals.css";
import { UserProvider } from "../components/contexts/user";
import { DataProvider } from "@/components/contexts/data";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="relative font-poppins h-dvh max-w-full bg-[#F3F6FD]">
        <UserProvider>
          <DataProvider>
            {children}
          </DataProvider>
        </UserProvider>
      </body>
    </html>
  )
}
