/**
 * Vite: import any asset as a string with `?raw` (used for offline HTML inclusions).
 * https://vite.dev/guide/assets.html#importing-asset-as-string
 */
declare module "*?raw" {
	const content: string;
	export default content;
}

declare module "*?url" {
	const href: string;
	export default href;
}
