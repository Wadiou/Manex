/**
 * CWS URL with extension id; the store normalizes/redirects the path segment
 * (slug) when the user opens the link in Chrome.
 */
export function chromeWebStoreListingUrl(extensionId: string): string {
	return `https://chromewebstore.google.com/detail/${encodeURIComponent(
		extensionId,
	)}`;
}
