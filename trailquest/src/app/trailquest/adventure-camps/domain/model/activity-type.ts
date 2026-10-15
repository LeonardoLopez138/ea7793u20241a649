/**
 * Supported activity types. There is a single adventure camp per activity type.
 *
 * @author Leonardo Lopez Torres
 */
export type ActivityType = 'hiking' | 'trekking' | 'camping' | 'climbing';

/**
 * All supported activity types, useful for building selectors.
 */
export const ACTIVITY_TYPES: readonly ActivityType[] = ['hiking', 'trekking', 'camping', 'climbing']
