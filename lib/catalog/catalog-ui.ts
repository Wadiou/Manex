import type { CatalogRecord } from "@/lib/catalog/catalog-types";

/** Whether the enable/disable control must stay fixed (browser / policy). */
export function isExtensionSwitchDisabled(
  record: CatalogRecord,
  togglingId: string | null,
): boolean {
  const policyLocked =
    (record.enabled && !record.mayDisable) ||
    (!record.enabled && record.mayEnable === false);
  return policyLocked || togglingId === record.id;
}
