const EXTENSION_TYPE_LABEL: Record<string, string> = {
	extension: "Extension",
	theme: "Theme",
	langpack: "Language pack",
	hosted_app: "Hosted app",
	packaged_app: "Packaged app",
	package_app: "Packaged app",
	legacy_packaged_app: "Legacy packaged app",
	login_screen_extension: "Login screen",
};

/**
 * User-facing type label; raw `type` in tooltips.
 */
export function getExtensionTypeLabel(type: string): string {
	return EXTENSION_TYPE_LABEL[type] ?? type;
}
