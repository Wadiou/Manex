import { useMemo, useState } from "react";
import { ErrorAlerts } from "@/components/extension-catalog/panel/ErrorAlerts";
import { FiltersBar } from "@/components/extension-catalog/panel/FiltersBar";
import { GroupSection } from "@/components/extension-catalog/panel/GroupSection";
import { ListSkeleton } from "@/components/extension-catalog/panel/ListSkeleton";
import { Header } from "@/components/extension-catalog/panel/Header";
import { SearchField } from "@/components/extension-catalog/panel/SearchField";
import {
	buildCatalogView,
	type CatalogSort,
	type CatalogVisibilityFilter,
} from "@/lib/catalog/catalog-view-query";
import { useCatalogViewMode } from "@/lib/catalog/hooks/use-catalog-view-mode";
import type { UseExtensionCatalogResult } from "@/lib/catalog/hooks/use-extension-catalog";

type InstalledPanelProps = {
	catalog: UseExtensionCatalogResult;
};

export function InstalledPanel({
	catalog: {
		records,
		loading,
		loadError,
		actionError,
		togglingId,
		refresh,
		setEnabled,
	},
}: InstalledPanelProps) {
	const { viewMode, setViewMode } = useCatalogViewMode();
	const [search, setSearch] = useState("");
	const [visibility, setVisibility] = useState<CatalogVisibilityFilter>("all");
	const [sort, setSort] = useState<CatalogSort>("name-asc");
	const [filterOpen, setFilterOpen] = useState(false);

	const viewRecords = useMemo(
		() => buildCatalogView(records, { search, visibility, sort }),
		[records, search, visibility, sort],
	);

	return (
		<div className="flex flex-col gap-4">
			<Header loading={loading} onRefresh={refresh} />

			<SearchField value={search} onChange={setSearch} />

			<FiltersBar
				filterOpen={filterOpen}
				onFilterOpenChange={setFilterOpen}
				visibility={visibility}
				onVisibilityChange={setVisibility}
				sort={sort}
				onSortChange={setSort}
				viewMode={viewMode}
				onViewModeChange={setViewMode}
			/>

			<ErrorAlerts
				loadError={loadError}
				actionError={actionError}
			/>
			{loading ? (
				<ListSkeleton layout={viewMode} />
			) : loadError ? null : (
				<GroupSection
					sectionId="manex-extensions-list"
					sectionAriaLabel="Extensions"
					empty="No extensions match."
					viewMode={viewMode}
					records={viewRecords}
					togglingId={togglingId}
					setEnabled={setEnabled}
				/>
			)}
		</div>
	);
}
