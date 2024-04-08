/**
 * Types for category
 */
export const categories = ['scotch', 'bourbon', 'irish', 'canadian', 'japanese'] as const;
export type TCategory = (typeof categories)[number] & string;
// Type guard
export const isTCategory = (str?: unknown): str is TCategory => categories.includes(str as TCategory);
