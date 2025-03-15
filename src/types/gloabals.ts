import { z } from "zod";
import { ENV_ADMIN_EMAILS } from "@/lib/constants";

const parseAdminEmails = z
  .string()
  .min(1)
  .transform((val) => val.split(",").map((email) => email.trim()));

let ADMIN_EMAILS: string[] = [];
const result = parseAdminEmails.safeParse(ENV_ADMIN_EMAILS);
if (result.success) {
  ADMIN_EMAILS = result.data;
}
export { ADMIN_EMAILS };
