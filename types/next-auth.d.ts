import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      surname: string;
      role: string;
      email: string;
      verified: boolean;
      createdAt: string;
      updatedAt: string;
      deletedAt?: string;
    };
  }
}
