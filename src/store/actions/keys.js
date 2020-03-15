/**
 * Why are these keys separated, you may ask? Well, since the second API key is used
 * for things like live searching, you'll find yourself running into rate-limit ceilings
 * all too frequently for even moderate amounts of searching.
 */

/* Primary TMDB API key, used for all non-search requests */
export const TMDB_API_KEY = 'YOUR_API_KEYS_HERE';

/* High-spike TMDB API key, used for every keystroke of search requests */
export const TMDB_API_KEY_SECONDARY = 'YOUR_API_KEYS_HERE';
