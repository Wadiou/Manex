import {
	CatalogItem,
	type CatalogItemLayout,
} from "@/components/extension-catalog/item/CatalogItem";
import type { CatalogRecord } from "@/lib/catalog/catalog-types";
import { cn } from "@/lib/utils";

export const catalogListClassName = (
	viewMode: CatalogItemLayout,
) =>
	cn(
		"m-0 p-0",
		viewMode === "grid"
			? "grid list-none grid-cols-1 items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-3"
			: "flex list-none flex-col",
	);

type GroupSectionProps = {
	/** Used as `aria-labelledby` when `sectionTitle` is set. */
	sectionId: string;
	sectionTitle?: string;
	/** When there is no visible heading, describe the list for assistive tech. */
	sectionAriaLabel?: string;
	empty: string;
	viewMode: CatalogItemLayout;
	records: CatalogRecord[];
	togglingId: string | null;
	setEnabled: (record: CatalogRecord, next: boolean) => void;
};

export function GroupSection({
	sectionId,
	sectionTitle,
	sectionAriaLabel,
	empty,
	viewMode,
	records,
	togglingId,
	setEnabled,
}: GroupSectionProps) {
	return (
		<section
			className="flex flex-col gap-2"
			aria-labelledby={sectionTitle ? sectionId : undefined}
			aria-label={sectionTitle ? undefined : sectionAriaLabel}
		>
			{sectionTitle ? (
				<h3
					id={sectionId}
					className="text-foreground text-sm font-semibold tracking-tight"
				>
					{sectionTitle}
				</h3>
			) : null}
			{records.length === 0 ? (
				<p className="text-muted-foreground text-sm">{empty}</p>
			) : (
				<ul className={catalogListClassName(viewMode)}>
					{records.map((r) => (
						<CatalogItem
							key={r.id}
							layout={viewMode}
							record={r}
							togglingId={togglingId}
							onEnabledChange={setEnabled}
						/>
					))}
				</ul>
			)}
		</section>
	);
}
