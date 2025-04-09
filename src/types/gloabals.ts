import { z } from "zod";
import { ENV_EDIT_ADMIN_EMAILS } from "@/lib/constants";
import { StaticImageData } from "next/image";

const parseAdminEmails = z
  .string()
  .min(1)
  .transform((val) => val.split(",").map((email) => email.trim()));

let ADMIN_EMAILS: string[] = [];
const result = parseAdminEmails.safeParse(ENV_EDIT_ADMIN_EMAILS);
if (result.success) {
  ADMIN_EMAILS = result.data;
}
export { ADMIN_EMAILS };

export interface Sponsor {
  name: string;
  image: StaticImageData;
  link: string;
}
