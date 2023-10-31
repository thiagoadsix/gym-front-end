import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { nextAuthOptions } from "../api/auth/[...nextauth]/route";
import { Sidebar } from "@/components/Sidebar";

interface PrivateLayoutProps {
  children: ReactNode;
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <html lang="eng">
      <body>
        <div className="min-h-screen grid grid-cols-app">
          <Sidebar />

          <main className="px-4 pb-12 pt-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
