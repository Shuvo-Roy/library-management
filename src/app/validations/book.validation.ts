import { z } from 'zod';

export const createBookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  genre: z.string().min(1, 'Genre is required'),
  isbn: z.string().min(10, 'ISBN must be at least 10 characters'),
  description: z.string().optional(),
  copies: z.number().min(1),
});

export const updateBookSchema = createBookSchema.partial();
