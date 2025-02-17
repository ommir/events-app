import { z } from 'zod';

export const eventFormSchema = z
  .object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z
      .string()
      .min(3, 'Description must be at least 3 characters')
      .max(400, 'Description must be less than 400 characters'),
    location: z
      .string()
      .min(3, 'Location must be at least 3 characters')
      .max(400, 'Location must be less than 400 characters'),
    imageUrl: z.string().min(1, 'Image is required'),
    startDateTime: z.date(),
    endDateTime: z.date(),
    categoryId: z.string().min(1, 'Category must be selected'),
    price: z.string(),
    isFree: z.boolean(),
    url: z.string().url('Please enter a valid URL'),
  })
  .refine(
    (data) =>
      data.isFree === true || (data.price && data.price.trim().length > 0),
    {
      message:
        'Either price must be provided or the event must be marked as free',
      path: ['price'], // You can also use 'isFree' or an empty path []
    }
  );
