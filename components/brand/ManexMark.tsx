import { cn } from "@/lib/utils";
import manexMarkSrc from "@/assets/logo.svg?url";

type ManexMarkProps = {
	className?: string;
	/** Tailwind size on the image (default matches previous `size-9`). */
	sizeClassName?: string;
};

/**
 * Manex mark: same bytes as [`assets/logo.svg`](../../assets/logo.svg)
 * (bundled via Vite `?url`).
 */
export function ManexMark({ className, sizeClassName = "h-9 w-auto" }: ManexMarkProps) {
	return (
		<img
			src={manexMarkSrc}
			alt=""
			width={123}
			height={117}
			decoding="async"
			className={cn("shrink-0 object-contain", sizeClassName, className)}
			aria-hidden
		/>
	);
}
