import type { CatalogRecord } from "@/lib/catalog/catalog-types";
import { getCatalogTypePlaceholderUrl } from "@/lib/catalog/catalog-type-placeholder";

/**
 * Prefer a larger icon from the management API, then fall back to the
 * type placeholder SVG (bundled `?url` assets in `assets/type/`).
 */
export function getCatalogThumbUrl(
	record: Pick<CatalogRecord, "icons" | "type">,
): string {
	const { icons, type } = record;
	if (icons.length > 0) {
		const sorted = [...icons].sort((a, b) => b.size - a.size);
		const best =
			sorted.find((i) => i.size >= 32) ?? sorted[0] ?? { url: "" };
		if (best.url) {
			return best.url;
		}
	}
	return getCatalogTypePlaceholderUrl(type);
}
