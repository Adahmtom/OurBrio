import { convexAuth } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Password({
      profile() {
        // Public self-registration is disabled.
        // Accounts are created by admins from the dashboard.
        throw new Error("Account creation is restricted to admins.");
      },
    }),
  ],
});
