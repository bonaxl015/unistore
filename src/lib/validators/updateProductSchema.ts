import { z } from 'zod';

import { insertProductSchema } from './insertProductSchema';

export const updateProductSchema = insertProductSchema.extend({
  id: z.string().min(1, 'Id is required')
});
