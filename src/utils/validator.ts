import { z } from "zod";

export const userSchema = z.object({
    name: z.string().optional(),
    email: z.string().email(),
    hash: z.string(),
    isDeleted: z.boolean().optional().default(false),
    createdAt: z.date().optional().default(new Date()),
});

export const projectSchema = z.object({
    slug: z.string(),
    name: z.string().optional().default("No Name"),
    data: z.array(
        z.object({
            title: z.string(),
            description: z.string().optional(),
            githubLink: z.string().url().optional(),
            link: z.string().url().optional(),
            author: z.string().optional(),
            createdAt: z.date().optional().default(new Date()),
        }),
    ),
});

export type UrlSchemaType = z.infer<typeof userSchema>;
export type FileSchemaType = z.infer<typeof projectSchema>;
