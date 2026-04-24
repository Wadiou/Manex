import themeTokens from "@/assets/theme-tokens.css?raw";
import logoSvg from "@/assets/logo.svg?raw";
import embeddedCatalogCss from "./embedded-catalog.css?raw";
import themeOfflinePrefers from "./theme-offline-prefers.css?raw";

/** Order: shared tokens, OS-dark override for file:// HTML, then layout. */
export const EMBEDDED_CATALOG_CSS = `${themeTokens}\n${themeOfflinePrefers}\n${embeddedCatalogCss}\n`;

function svgToDataUrl(svg: string): string {
	return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/** Inlined in exported HTML so the favicon works when the file is opened from disk. */
export const EMBEDDED_CATALOG_FAVICON_HREF = svgToDataUrl(logoSvg);
