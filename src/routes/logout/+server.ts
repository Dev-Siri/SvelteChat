import type { RequestHandler } from "./$types";

import { auth } from "../../utils/firebase";

export const POST: RequestHandler = async ({ cookies }) => {
  await auth.signOut();

  cookies.delete("auth_token");

  return new Response("OK");
};
