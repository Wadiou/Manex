import { useState, type ComponentProps } from "react";
import { DownloadIcon } from "lucide-react";
import { downloadExtensionCatalogHtml } from "@/lib/export";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ButtonProps = ComponentProps<typeof Button>;

type ExportHtmlButtonProps = {
	fullWidth?: boolean;
	/** Button label (e.g. short "Export" in dashboard, longer text in popup). */
	label?: string;
	showIcon?: boolean;
} & Omit<ButtonProps, "onClick" | "disabled" | "children" | "type">;

/**
 * Starts a download of the user’s extension list as a simple webpage file (popup + dashboard).
 */
export function ExportHtmlButton({
	fullWidth,
	label = "Export",
	showIcon = false,
	className,
	variant = "secondary",
	...rest
}: ExportHtmlButtonProps) {
	const [exporting, setExporting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const onClick = () => {
		setError(null);
		setExporting(true);
		(async () => {
			const result = await downloadExtensionCatalogHtml();
			setExporting(false);
			if (!result.ok) {
				setError(result.message);
			}
		})();
	};

	return (
		<div className={cn("flex flex-col gap-1", fullWidth && "w-full")}>
			<Button
				{...rest}
				type="button"
				variant={variant}
				className={cn(
					fullWidth && "w-full",
					fullWidth && showIcon && "justify-start gap-2",
					showIcon && !fullWidth && "gap-1.5",
					className,
				)}
				disabled={exporting}
				aria-busy={exporting}
				onClick={onClick}
			>
				{fullWidth && showIcon ? (
					<>
						<span
							className="flex size-4 shrink-0 items-center justify-center"
							aria-hidden
						>
							{!exporting ? (
								<DownloadIcon className="size-4" aria-hidden />
							) : null}
						</span>
						<span className="min-w-0 flex-1 text-left">
							{exporting ? "Exporting…" : label}
						</span>
					</>
				) : (
					<>
						{!exporting && showIcon ? (
							<DownloadIcon className="size-4 shrink-0" aria-hidden />
						) : null}
						{exporting ? "Exporting…" : label}
					</>
				)}
			</Button>
			{error ? (
				<p role="alert" className="text-destructive text-xs leading-snug">
					{error}
				</p>
			) : null}
		</div>
	);
}
