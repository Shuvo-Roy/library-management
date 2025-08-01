import { z } from 'zod';

export const borrowBookSchema = z.object({
  book: z.string().length(24, 'Invalid Book ID'),
  quantity: z.number().int().positive(),
  dueDate: z.string().refine(date => !isNaN(Date.parse(date)), {
    message: 'Invalid date format',
  }),
});
