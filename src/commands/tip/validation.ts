import { z } from 'zod';

export const TipValidationSchema = z.object({
  value: z.preprocess((arg) => {
    if (typeof arg === 'string') {
      const parsed = parseFloat(arg);
      if (!Number.isNaN(parsed)) {
        return parsed;
      }
    }
    return arg;
  }, z.number().positive()),
});
