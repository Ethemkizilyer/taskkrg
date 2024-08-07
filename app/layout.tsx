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
      <body className="relative font-poppins h-dvh max-w-full">
        <UserProvider>
          {/* //INFO: DataProvider wrote after UserProvider because we can get the data with user token. */}
          <DataProvider>
            {children}
          </DataProvider>
        </UserProvider>
      </body>
    </html>
  )
}
