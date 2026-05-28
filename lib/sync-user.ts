import { currentUser } from "@clerk/nextjs/server";
import prisma from "./prisma";

type DbUser = Awaited<ReturnType<typeof prisma.user.create>>;

export async function syncCurrentUser(): Promise<DbUser | null> {
  try {
    // Get user data from clerk
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return null;
    }
    const email = clerkUser.emailAddresses[0]?.emailAddress;
    if (!email) {
      throw new Error("User email not found");
    }

    // Check if user exists in db
    let dbUser = await prisma.user.findUnique({
      where: { clerkUserId: clerkUser.id },
    });
    if (dbUser) {
      // Update existing user
      dbUser = await prisma.user.update({
        where: { id: dbUser.id },
        data: {
          email,
          name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
          image: clerkUser.imageUrl,
        },
      });
      return dbUser;
    } else {
      const userCount = await prisma.user.count();
      const isFirstUser = userCount === 0;

      dbUser = await prisma.user.create({
        data: {
          clerkUserId: clerkUser.id,
          email,
          name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
          image: clerkUser.imageUrl,
          role: isFirstUser ? "admin" : "user",
        },
      });
      console.log(`New User created: ${email} with role: ${dbUser.role}`);
      return dbUser;
    }

    return dbUser;
  } catch (error) {
    console.log("Error syncing user from Clerk:", error);

    throw error;
  }
}
