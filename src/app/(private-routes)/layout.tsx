import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { Sidebar } from "@/components/Sidebar";

import { nextAuthOptions } from "../api/auth/[...nextauth]/route";

interface PrivateLayoutProps {
  children: ReactNode;
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <html lang="eng">
      <body>
        <div className="min-h-screen grid grid-cols-app overflow-hidden">
          <Sidebar />

          <main className="px-4 pb-12 pt-8 overflow-y-auto h-screen">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
