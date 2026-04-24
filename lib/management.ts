import {
  mapExtensionInfoToCatalogRecord,
  type CatalogRecord,
} from "./catalog/catalog-types";

export { mapExtensionInfoToCatalogRecord } from "./catalog/catalog-types";

const INSTALL_TYPE_LABEL: Record<string, string> = {
  normal: "Web Store / normal",
  development: "Unpacked (developer mode)",
  admin: "Enterprise / policy",
  sideload: "Sideloaded",
  other: "Other",
};

/**
 * User-facing short label; keep raw `installType` for tooltips / support.
 */
export function getInstallTypeLabel(installType: string): string {
  return INSTALL_TYPE_LABEL[installType] ?? installType;
}

export async function listInstalled(): Promise<CatalogRecord[]> {
  const all = await browser.management.getAll();
  return all.map(mapExtensionInfoToCatalogRecord);
}

/**
 * Toggles an extension on or off. Respects `mayDisable` / `mayEnable` and maps
 * Chrome error strings to clearer messages.
 */
export async function setExtensionEnabled(
  id: string,
  enabled: boolean,
): Promise<void> {
  const ext = await browser.management.get(id);
  if (enabled) {
    if (ext.mayEnable === false) {
      throw new Error("This item cannot be enabled.");
    }
  } else if (ext.mayDisable === false) {
    throw new Error(
      "This item cannot be disabled. It may be required or restricted by policy.",
    );
  }

  try {
    await browser.management.setEnabled(id, enabled);
  } catch (e) {
    const raw = e instanceof Error ? e.message : String(e);
    if (
      /cannot be modified|cannot be disabled|not allowed|permission/i.test(
        raw,
      )
    ) {
      throw new Error(
        "We could not change this extension. It may be required or blocked by your organization.",
      );
    }
    throw e instanceof Error ? e : new Error(String(e));
  }
}
