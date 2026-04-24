import { LayoutGridIcon, ListFilterIcon, ListIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	type CatalogSort,
	type CatalogVisibilityFilter,
} from "@/lib/catalog/catalog-view-query";
import type { CatalogItemLayout } from "@/components/extension-catalog/item/CatalogItem";

type FiltersBarProps = {
	filterOpen: boolean;
	onFilterOpenChange: (open: boolean) => void;
	visibility: CatalogVisibilityFilter;
	onVisibilityChange: (v: CatalogVisibilityFilter) => void;
	sort: CatalogSort;
	onSortChange: (v: CatalogSort) => void;
	viewMode: CatalogItemLayout;
	onViewModeChange: (mode: CatalogItemLayout) => void;
};

export function FiltersBar({
	filterOpen,
	onFilterOpenChange,
	visibility,
	onVisibilityChange,
	sort,
	onSortChange,
	viewMode,
	onViewModeChange,
}: FiltersBarProps) {
	return (
		<div className="flex flex-wrap items-center justify-between gap-2">
			<Popover open={filterOpen} onOpenChange={onFilterOpenChange}>
				<PopoverTrigger
					type="button"
					render={
						<Button
							type="button"
							variant="outline"
							size="sm"
							className="gap-1.5"
							aria-expanded={filterOpen}
							aria-label="Filters: show and sort"
						/>
					}
				>
					<ListFilterIcon className="size-4" aria-hidden />
					Filter
				</PopoverTrigger>
				<PopoverContent align="start" className="w-80 sm:w-96">
					<div className="flex flex-col gap-3">
						<div className="space-y-1.5">
							<Label className="text-xs" htmlFor="manex-visibility">
								Show
							</Label>
							<Select
								modal={false}
								value={visibility}
								onValueChange={(v) => {
									onVisibilityChange((v ?? "all") as CatalogVisibilityFilter);
								}}
							>
								<SelectTrigger
									className="w-full"
									id="manex-visibility"
									size="default"
								>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All</SelectItem>
									<SelectItem value="enabled">Enabled only</SelectItem>
									<SelectItem value="disabled">Disabled only</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="space-y-1.5">
							<Label className="text-xs" htmlFor="manex-sort">
								Sort
							</Label>
							<Select
								modal={false}
								value={sort}
								onValueChange={(v) => {
									onSortChange((v ?? "name-asc") as CatalogSort);
								}}
							>
								<SelectTrigger className="w-full" id="manex-sort" size="default">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="name-asc">Name (A–Z)</SelectItem>
									<SelectItem value="name-desc">Name (Z–A)</SelectItem>
									<SelectItem value="enabled-first">Enabled first</SelectItem>
									<SelectItem value="disabled-first">Disabled first</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</PopoverContent>
			</Popover>
			<div className="flex items-center gap-1">
				<Button
					type="button"
					variant="outline"
					size="sm"
					aria-pressed={viewMode === "grid"}
					aria-label="Grid view"
					title="Grid view"
					onClick={() => {
						onViewModeChange("grid");
					}}
				>
					<LayoutGridIcon className="size-4" aria-hidden />
				</Button>
				<Button
					type="button"
					variant="outline"
					size="sm"
					aria-pressed={viewMode === "list"}
					aria-label="List view"
					title="List view"
					onClick={() => {
						onViewModeChange("list");
					}}
				>
					<ListIcon className="size-4" aria-hidden />
				</Button>
			</div>
		</div>
	);
}
