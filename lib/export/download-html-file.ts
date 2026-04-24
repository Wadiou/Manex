/**
 * Triggers a one-off download in an extension page (popup / options / background with DOM).
 * Not used for the offline catalog file’s internal behavior — only for saving the file from the extension.
 */
export function downloadTextFile(
	content: string,
	filename: string,
	mimeType = "text/html;charset=utf-8",
): void {
	const blob = new Blob([content], { type: mimeType });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.rel = "noopener";
	a.click();
	URL.revokeObjectURL(url);
}
