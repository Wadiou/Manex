import { ManexMark } from "@/components/brand/ManexMark";
import { InstalledPanel } from "@/components/extension-catalog/panel/InstalledPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useExtensionCatalog } from "@/lib/catalog/hooks/use-extension-catalog";
import { EXTENSION_VERSION } from "@/lib/extension-version";

export default function App() {
	const catalog = useExtensionCatalog();

	return (
		<div className="bg-background text-foreground box-border min-h-screen p-6">
			<Card className="mx-auto max-w-4xl">
				<CardHeader className="pb-2">
					<CardTitle className="flex items-center">
						<ManexMark sizeClassName="h-14 w-auto shrink-0" />
						<span className="sr-only">Manex</span>
					</CardTitle>
				</CardHeader>
				<CardContent className="pt-0">
					<InstalledPanel catalog={catalog} />
				</CardContent>
			</Card>
			<p className="text-muted-foreground mx-auto mt-4 max-w-4xl text-center text-xs tabular-nums">
				Manex v{EXTENSION_VERSION}
			</p>
		</div>
	);
}
