import { ChevronRightIcon, SettingsIcon } from "lucide-react";
import { ManexMark } from "@/components/brand/ManexMark";
import { ExportHtmlButton } from "@/components/extension-catalog/export/ExportHtmlButton";
import { Button } from "@/components/ui/button";
import { EXTENSION_VERSION } from "@/lib/extension-version";

export default function App() {
	const openDashboard = () => {
		void browser.runtime.openOptionsPage();
	};

	return (
		<div className="text-foreground box-border flex w-80 max-w-[100vw] flex-col gap-5 px-5 py-5">
			<header>
				<div className="flex gap-3">
					<ManexMark sizeClassName="h-10 w-auto shrink-0" />
					<div className="min-w-0 flex flex-col gap-1.5">
						<h1 className="text-xl font-semibold leading-none">Manex</h1>
						<p className="text-muted-foreground text-sm leading-snug">
							Export a copy of your extensions, or open the manager for more.
						</p>
					</div>
				</div>
			</header>
			<div className="flex flex-col gap-3">
				<Button
					type="button"
					className="w-full justify-start gap-2"
					onClick={openDashboard}
				>
					<span className="flex size-4 shrink-0 items-center justify-center">
						<SettingsIcon className="size-4" aria-hidden />
					</span>
					<span className="min-w-0 flex-1 text-left">Manage</span>
					<ChevronRightIcon
						className="size-4 shrink-0 opacity-90"
						aria-hidden
					/>
				</Button>
				<ExportHtmlButton fullWidth label="Export my extensions" showIcon />
			</div>
			<footer className="border-border border-t pt-4">
				<p className="text-muted-foreground text-center text-xs leading-snug">
					Search and filters are in Manage.
				</p>
				<p className="text-muted-foreground mt-1 text-center text-[0.65rem] leading-snug tabular-nums">
					v{EXTENSION_VERSION}
				</p>
			</footer>
		</div>
	);
}
