import { getCatalogThumbUrl } from "@/lib/catalog/catalog-thumb";
import type { CatalogRecord } from "@/lib/catalog/catalog-types";
import { cn } from "@/lib/utils";

type CatalogThumbProps = {
	record: Pick<CatalogRecord, "icons" | "type" | "name">;
	className?: string;
	/** Pixels; image is `object-contain` inside a padded box. */
	size?: number;
};

/**
 * Renders a management API icon when available, otherwise the bundled `assets/type/`
 * placeholder for the item’s `type`.
 */
export function CatalogThumb({
	record,
	className,
	size = 32,
}: CatalogThumbProps) {
	const src = getCatalogThumbUrl(record);
	return (
		<div
			className={cn("flex shrink-0 items-center justify-center", className)}
			style={{ width: size + 8, height: size + 8 }}
			aria-hidden
		>
			<img
				src={src}
				alt=""
				width={size}
				height={size}
				className="object-contain"
				draggable={false}
			/>
		</div>
	);
}
