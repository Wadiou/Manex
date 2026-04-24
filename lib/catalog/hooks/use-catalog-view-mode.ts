import { useCallback, useState } from "react";

const STORAGE_KEY = "manex:catalogViewMode";

function readInitialMode(): "grid" | "list" {
	if (typeof localStorage === "undefined") {
		return "grid";
	}
	const v = localStorage.getItem(STORAGE_KEY);
	return v === "list" || v === "grid" ? v : "grid";
}

/**
 * Default grid; persisted in `localStorage` for the options dashboard.
 */
export function useCatalogViewMode() {
	const [viewMode, setViewModeState] = useState<"grid" | "list">(
		readInitialMode,
	);

	const setViewMode = useCallback((mode: "grid" | "list") => {
		setViewModeState(mode);
		try {
			localStorage.setItem(STORAGE_KEY, mode);
		} catch {
			/* private mode, etc. */
		}
	}, []);

	return { viewMode, setViewMode };
}
