import z from "zod";

export const signUpInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

export const signInInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const postInput = z.object({
  title: z.string(),
  content: z.string(),
});

export const updatePostInput = z.object({
  title: z.string(),
  content: z.string(),
  id: z.string(),
});

export type SigUpInput = z.infer<typeof signUpInput>;
export type SigInInput = z.infer<typeof signInInput>;
export type PostInput = z.infer<typeof postInput>;
export type UpdatePostInput = z.infer<typeof updatePostInput>;
