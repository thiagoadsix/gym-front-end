import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { nextAuthOptions } from "../api/auth/[...nextauth]/route";

interface PrivateLayoutProps {
  children: ReactNode;
}

export default async function AuthLayout({ children }: PrivateLayoutProps) {
  const session = await getServerSession(nextAuthOptions);

  console.log(session)

  if (session) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
