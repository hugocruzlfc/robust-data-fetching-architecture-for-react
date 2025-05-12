import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");

export const teamSchema = z.object({
  id: z.number(),
  name: requiredString.regex(
    /^[a-zA-Z0-9_-]+$/,
    "Only letters, numbers, - and _ allowed"
  ),
  description: z.string().min(1, { message: "Description is required" }),
  members: z.array(z.string()).optional(),
});

export type TeamValues = z.infer<typeof teamSchema>;
