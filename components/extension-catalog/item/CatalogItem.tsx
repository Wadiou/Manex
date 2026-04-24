import { CatalogThumb } from "@/components/extension-catalog/item/CatalogThumb";
import { ItemMeta } from "@/components/extension-catalog/item/ItemMeta";
import { ItemName } from "@/components/extension-catalog/item/ItemName";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import type { CatalogRecord } from "@/lib/catalog/catalog-types";
import { isExtensionSwitchDisabled } from "@/lib/catalog/catalog-ui";
import { cn } from "@/lib/utils";

export type CatalogItemLayout = "list" | "grid";

type CatalogItemProps = {
	record: CatalogRecord;
	layout: CatalogItemLayout;
	togglingId: string | null;
	onEnabledChange: (record: CatalogRecord, next: boolean) => void;
};

export function CatalogItem({
	record,
	layout,
	togglingId,
	onEnabledChange,
}: CatalogItemProps) {
	const switchDisabled = isExtensionSwitchDisabled(record, togglingId);
	const switchAria = `${record.enabled ? "Disable" : "Enable"} ${record.name}`;

	const switchEl = (
		<Switch
			checked={record.enabled}
			disabled={switchDisabled}
			aria-label={switchAria}
			onCheckedChange={(next) => void onEnabledChange(record, next)}
		/>
	);

	const liTitle = `${record.id} — install: ${record.installType}`;

	if (layout === "list") {
		return (
			<li
				className="border-border flex items-start gap-3 border-b py-3 first:pt-0 last:border-0"
				title={liTitle}
			>
				<CatalogThumb className="mt-0.5" record={record} size={32} />
				<div className="min-w-0 flex-1">
					<ItemName record={record} />
					<ItemMeta
						record={record}
						compact
						className="mt-1.5"
					/>
				</div>
				<div className="pt-0.5">{switchEl}</div>
			</li>
		);
	}

	return (
		<li className="flex h-full min-h-0 list-none" title={liTitle}>
			<Card
				size="sm"
				className={cn(
					"h-full min-h-0 gap-0 border border-border/90 py-0 shadow-sm ring-0",
					"bg-card dark:border-foreground/25",
				)}
			>
				<CardContent className="flex min-h-0 flex-1 flex-col gap-2.5 px-4 pt-4 pb-4">
					<div className="flex shrink-0 items-start justify-between gap-2">
						<CatalogThumb className="shrink-0" record={record} size={48} />
						{switchEl}
					</div>
					<div className="shrink-0 min-h-11">
						<ItemName
							className="line-clamp-2"
							record={record}
						/>
					</div>
					<ItemMeta layout="grid" record={record} />
				</CardContent>
			</Card>
		</li>
	);
}
