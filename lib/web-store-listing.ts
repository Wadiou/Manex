import type { CatalogRecord } from "@/lib/catalog/catalog-types";
import { chromeWebStoreListingUrl } from "@/lib/export/standalone/chrome-web-store-url";

export { chromeWebStoreListingUrl } from "@/lib/export/standalone/chrome-web-store-url";

/**
 * Prefer linking to the Chrome Web Store for typical Web Store installs; avoid
 * a useless CWS URL for unpacked / side-loaded items.
 */
export function shouldOfferChromeWebStoreLink(record: CatalogRecord): boolean {
	return record.installType === "normal";
}
