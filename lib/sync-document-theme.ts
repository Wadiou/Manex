const prefersDark = "(prefers-color-scheme: dark)";

/**
 * Keeps `<html class="dark">` in sync with the user's OS / browser color scheme
 * so shadcn tokens in `.dark { … }` match the device theme. Listens for live changes.
 */
export function syncDocumentThemeWithDevice(): void {
	const mq = window.matchMedia(prefersDark);
	const apply = () => {
		document.documentElement.classList.toggle("dark", mq.matches);
	};
	apply();
	mq.addEventListener("change", apply);
}
