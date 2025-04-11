import { IS_DEV } from "@/lib/environment";
import { createThirdwebClient } from "thirdweb";

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID

let clientId;

clientId = "lmao123456";

if (!IS_DEV) {
  if (!clientId) {
    throw new Error("No client ID provided");
  }
  clientId = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID;
}

export const client = createThirdwebClient({
  clientId: clientId!,
});
