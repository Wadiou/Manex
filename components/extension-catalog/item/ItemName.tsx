import type { CatalogRecord } from "@/lib/catalog/catalog-types";
import { cn } from "@/lib/utils";
import {
	chromeWebStoreListingUrl,
	shouldOfferChromeWebStoreLink,
} from "@/lib/web-store-listing";

type ItemNameProps = {
	record: CatalogRecord;
	className?: string;
};

const linkClass = cn(
	"line-clamp-2 min-w-0 text-sm font-medium leading-snug",
	"text-foreground",
	"hover:text-primary hover:underline",
	"focus-visible:rounded-sm focus-visible:text-primary focus-visible:underline focus-visible:outline-none",
);

/**
 * CWS name link when a listing is likely; otherwise a title line plus optional
 * homepage link.
 */
export function ItemName({
	record,
	className,
}: ItemNameProps) {
	const store = shouldOfferChromeWebStoreLink(record);
	const cwsUrl = chromeWebStoreListingUrl(record.id);

	if (store) {
		return (
			<a
				href={cwsUrl}
				target="_blank"
				rel="noopener noreferrer"
				className={cn(linkClass, className)}
			>
				{record.name}
			</a>
		);
	}

	return (
		<div className={cn("min-w-0 space-y-1", className)}>
			<span className="line-clamp-2 text-sm font-medium leading-snug text-foreground">
				{record.name}
			</span>
			{record.homepageUrl ? (
				<div>
					<a
						href={record.homepageUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="text-primary text-xs underline-offset-2 hover:underline"
					>
						Homepage
					</a>
				</div>
			) : null}
		</div>
	);
}
