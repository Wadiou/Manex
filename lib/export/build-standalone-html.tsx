import type { CatalogRecord } from "@/lib/catalog/catalog-types";
import { renderToStaticMarkup } from "react-dom/server";
import { ExportedCatalogDocument } from "./standalone/ExportedCatalogDocument";

/**
 * Builds the offline catalog file as a static HTML string by rendering a React tree
 * with `renderToStaticMarkup`. The resulting file does not include a React runtime.
 */
export function buildStandaloneCatalogHtml(records: CatalogRecord[]): string {
	const markup = renderToStaticMarkup(
		<ExportedCatalogDocument records={records} />,
	);

	return `<!DOCTYPE html>\n${markup}\n`;
}
