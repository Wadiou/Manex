import extensionUrl from "@/assets/type/extension.svg?url";
import hostedAppUrl from "@/assets/type/hosted_app.svg?url";
import loginScreenUrl from "@/assets/type/login-screen.svg?url";
import packagedUrl from "@/assets/type/packaged.svg?url";
import themeUrl from "@/assets/type/theme.svg?url";
import unknownUrl from "@/assets/type/unknown.svg?url";

/**
 * Static assets under `assets/type/` for items where we skip API icons
 * (missing icons) or as a `type` hint. Pair with `getCatalogThumbUrl` in
 * `catalog-thumb.ts`.
 */
export function getCatalogTypePlaceholderUrl(extensionType: string): string {
	switch (extensionType) {
		case "theme":
			return themeUrl;
		case "hosted_app":
			return hostedAppUrl;
		case "packaged_app":
		case "package_app":
		case "legacy_packaged_app":
			return packagedUrl;
		case "login_screen_extension":
			return loginScreenUrl;
		case "extension":
		case "langpack":
			return extensionUrl;
		default:
			return unknownUrl;
	}
}
