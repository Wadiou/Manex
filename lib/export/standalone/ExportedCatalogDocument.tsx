import {
	EMBEDDED_CATALOG_CSS,
	EMBEDDED_CATALOG_FAVICON_HREF,
} from "./embedded-assets";
import { chromeWebStoreListingUrl } from "./chrome-web-store-url";
import type { CatalogRecord } from "@/lib/catalog/catalog-types";
import { EXTENSION_VERSION } from "@/lib/extension-version";
import { shouldOfferChromeWebStoreLink } from "@/lib/web-store-listing";

type ExportedCatalogDocumentProps = {
	records: CatalogRecord[];
};

function sortByName(a: CatalogRecord, b: CatalogRecord): number {
	return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
}

function partitionByEnabled(
	records: CatalogRecord[],
): [CatalogRecord[], CatalogRecord[]] {
	const enabled: CatalogRecord[] = [];
	const disabled: CatalogRecord[] = [];
	for (const ext of records) {
		if (ext.enabled) {
			enabled.push(ext);
		} else {
			disabled.push(ext);
		}
	}
	enabled.sort(sortByName);
	disabled.sort(sortByName);
	return [enabled, disabled];
}

type ExtensionTableProps = { rows: CatalogRecord[]; empty: string };

/** Lucide-style external link; `currentColor` tracks the parent link in light/dark. */
function ExternalLinkIcon() {
	return (
		<svg
			className="ext-name-icon"
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			<path d="M15 3h6v6" />
			<path d="M10 14 21 3" />
			<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
		</svg>
	);
}

function ExtensionTable({ rows, empty }: ExtensionTableProps) {
	if (rows.length === 0) {
		return <p className="empty">{empty}</p>;
	}
	return (
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Version</th>
				</tr>
			</thead>
			<tbody>
				{rows.map((ext) => {
					const store = shouldOfferChromeWebStoreLink(ext);
					const storeUrl = store ? chromeWebStoreListingUrl(ext.id) : null;
					return (
						<tr key={ext.id}>
							<td className="col-name">
								{storeUrl ? (
									<a
										className="ext-name-link"
										href={storeUrl}
										target="_blank"
										rel="noopener noreferrer"
										title="Open in Chrome Web Store"
									>
										<span className="ext-name-label">{ext.name}</span>
										<ExternalLinkIcon />
									</a>
								) : (
									<span className="ext-name-plain">{ext.name}</span>
								)}
							</td>
							<td className="col-version">{ext.version}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}

/**
 * Static document rendered with `renderToStaticMarkup` to produce the downloadable
 * HTML catalog. No client-side React: the file is plain HTML when opened.
 */
export function ExportedCatalogDocument({ records }: ExportedCatalogDocumentProps) {
	const [enabled, disabled] = partitionByEnabled(records);
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link
					rel="icon"
					href={EMBEDDED_CATALOG_FAVICON_HREF}
					type="image/svg+xml"
				/>
				<meta
					name="generator"
					content={`Manex ${EXTENSION_VERSION}`}
				/>
				<title>Manex — My extensions</title>
				<style dangerouslySetInnerHTML={{ __html: EMBEDDED_CATALOG_CSS }} />
			</head>
			<body>
				<h1>My extensions</h1>
				<p className="export-date">Exported on {new Date().toLocaleString()}</p>
				<section>
					<h2 className="section-title">Enabled</h2>
					<ExtensionTable
						rows={enabled}
						empty="No enabled extensions in this list."
					/>
				</section>
				<section>
					<h2 className="section-title">Disabled</h2>
					<ExtensionTable
						rows={disabled}
						empty="No disabled extensions in this list."
					/>
				</section>
				<p className="manex-catalog-version">
					Exported with Manex v{EXTENSION_VERSION}
				</p>
			</body>
		</html>
	);
}
