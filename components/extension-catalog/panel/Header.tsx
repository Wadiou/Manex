import { RefreshCwIcon } from "lucide-react";
import { ExportHtmlButton } from "@/components/extension-catalog/export/ExportHtmlButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type HeaderProps = {
	loading: boolean;
	onRefresh: () => void;
};

export function Header({
	loading,
	onRefresh,
}: HeaderProps) {
	return (
		<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
			<h2 className="text-foreground text-base font-semibold">Extensions</h2>
			<div className="flex flex-wrap items-center justify-end gap-1">
				<ExportHtmlButton size="sm" label="Export" variant="outline" showIcon />
				<Button
					type="button"
					variant="outline"
					size="sm"
					className="gap-1.5"
					onClick={() => {
						void onRefresh();
					}}
					disabled={loading}
					aria-busy={loading}
					aria-label="Refresh list"
				>
					<RefreshCwIcon
						className={cn("size-4", loading && "motion-safe:animate-spin")}
						aria-hidden
					/>
					Refresh
				</Button>
			</div>
		</div>
	);
}
