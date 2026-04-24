import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { CatalogItemLayout } from "@/components/extension-catalog/item/CatalogItem";

const PLACEHOLDERS = [1, 2, 3, 4, 5, 6] as const;

type ListSkeletonProps = {
	/** Matches the current view mode so loading state doesn’t jump layout. */
	layout?: CatalogItemLayout;
};

export function ListSkeleton({
	layout = "grid",
}: ListSkeletonProps) {
	if (layout === "list") {
		return (
			<div className="flex flex-col gap-0" aria-busy>
				{PLACEHOLDERS.map((i) => (
					<div
						key={i}
						className="border-border flex items-start gap-3 border-b py-3 first:pt-0 last:border-0"
					>
						<Skeleton className="mt-0.5 size-10 shrink-0 rounded-md" />
						<div className="min-w-0 flex-1 space-y-2">
							<Skeleton className="h-4 w-2/3" />
							<Skeleton className="h-3 w-1/2" />
							<Skeleton className="h-3 w-4/5" />
						</div>
						<Skeleton className="h-5 w-11 shrink-0 self-start rounded-full" />
					</div>
				))}
			</div>
		);
	}

	return (
		<div
			className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
			aria-busy
		>
			{PLACEHOLDERS.map((i) => (
				<Card
					key={i}
					size="sm"
					className="list-none border-border gap-0 py-0 shadow-sm"
				>
					<CardContent className="flex flex-col gap-2.5 py-4">
						<div className="flex items-start justify-between gap-2">
							<Skeleton className="size-14 rounded-md" />
							<Skeleton className="h-5 w-11 shrink-0 rounded-full" />
						</div>
						<Skeleton className="h-4 w-4/5" />
						<div className="space-y-2">
							<Skeleton className="h-3 w-full" />
							<Skeleton className="h-3 w-2/3" />
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
