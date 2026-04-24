import { Badge } from "@/components/ui/badge";
import type { CatalogRecord } from "@/lib/catalog/catalog-types";
import { getExtensionTypeLabel } from "@/lib/catalog/extension-labels";
import { getInstallTypeLabel } from "@/lib/management";
import { cn } from "@/lib/utils";

type ItemMetaProps = {
	record: CatalogRecord;
	className?: string;
	compact?: boolean;
	/** Grid cards use a fixed block layout so rows align; list keeps compact flow. */
	layout?: "list" | "grid";
};

export function ItemMeta({
	record,
	className,
	compact = false,
	layout = "list",
}: ItemMetaProps) {
	const versionLine = record.versionName
		? `v${record.version} (${record.versionName})`
		: `v${record.version}`;

	const badges = (
		<>
			<Badge variant="secondary" title={record.type}>
				{getExtensionTypeLabel(record.type)}
			</Badge>
			<Badge
				variant="outline"
				className="border-foreground/15 dark:border-foreground/25"
				title={record.installType}
			>
				{getInstallTypeLabel(record.installType)}
			</Badge>
			{record.offlineEnabled ? (
				<Badge
					variant="outline"
					className="border-foreground/15 dark:border-foreground/25"
				>
					Offline
				</Badge>
			) : null}
		</>
	);

	if (layout === "grid") {
		return (
			<div
				className={cn(
					"text-muted-foreground flex min-h-0 min-w-0 flex-1 flex-col gap-2 text-xs",
					className,
				)}
			>
				<p
					className="inline-flex min-w-0 flex-wrap items-center gap-1.5"
					title={versionLine}
				>
					<span className="shrink-0 font-medium text-foreground/90">Version</span>
					<span className="truncate">{versionLine}</span>
				</p>
				<div className="min-h-10 shrink-0">
					{record.description ? (
						<p
							className="text-foreground/80 line-clamp-2"
							title={record.description}
						>
							{record.description}
						</p>
					) : null}
				</div>
				<div className="flex min-h-10 shrink-0 flex-wrap content-start gap-1.5">
					{badges}
				</div>
				<div className="min-h-0 min-w-0 flex-1" aria-hidden />
				<div
					className="text-muted-foreground/90 min-w-0 shrink-0 truncate border-t border-foreground/10 pt-2.5 font-mono text-[0.7rem] leading-tight dark:border-foreground/20"
					title={record.id}
				>
					ID {record.id}
				</div>
			</div>
		);
	}

	return (
		<div
			className={cn(
				"text-muted-foreground flex min-w-0 flex-col gap-1.5 text-xs",
				className,
			)}
		>
			<p className="inline-flex min-w-0 flex-wrap items-center gap-1.5" title={versionLine}>
				<span className="shrink-0 font-medium text-foreground/90">Version</span>
				<span className="truncate">{versionLine}</span>
			</p>
			{record.description ? (
				<p
					className={cn("text-foreground/80 line-clamp-2", compact && "line-clamp-1")}
					title={record.description}
				>
					{record.description}
				</p>
			) : null}
			<div className="flex flex-wrap items-center gap-1.5">
				{badges}
			</div>
			<div
				className="text-muted-foreground/90 min-w-0 truncate font-mono text-[0.7rem] leading-tight"
				title={record.id}
			>
				ID {record.id}
			</div>
		</div>
	);
}
