"use client"

import ShortSidebar from "@/components/sidebar/shortSidebar";
import Header from "@/components/header/header";
import LongSidebar from "@/components/sidebar/longSidebar";
import Content from "@/components/main/main";
import { useUser } from "@/components/providers/userProvider";
import { useRouter } from "next/navigation";

export default function Page() {
  const { user } = useUser();
  const router = useRouter();

  if (!user) router.push("/");
  return (
    <div className="bg-[#F3F6FD] h-full">
      <Header />
      <div className="flex h-full">
        <ShortSidebar />
        <LongSidebar />
        <Content />
      </div>
    </div>
  )
}
