import "./globals.css";
import { UserProvider } from "../components/providers/userProvider";
import { DataProvider } from "@/components/providers/dataProvider";

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
