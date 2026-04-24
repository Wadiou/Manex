import type { CatalogRecord } from "@/lib/catalog/catalog-types";

export type CatalogVisibilityFilter = "all" | "enabled" | "disabled";
export type CatalogSort =
  | "name-asc"
  | "name-desc"
  | "enabled-first"
  | "disabled-first";

/**
 * Substring search on name, id, and description (case-insensitive).
 */
export function filterCatalogBySearch(
  records: CatalogRecord[],
  query: string,
): CatalogRecord[] {
  const q = query.trim().toLowerCase();
  if (!q) {
    return records;
  }
  return records.filter(
    (r) =>
      r.name.toLowerCase().includes(q) ||
      r.id.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q),
  );
}

export function filterCatalogByVisibility(
  records: CatalogRecord[],
  visibility: CatalogVisibilityFilter,
): CatalogRecord[] {
  if (visibility === "enabled") {
    return records.filter((r) => r.enabled);
  }
  if (visibility === "disabled") {
    return records.filter((r) => !r.enabled);
  }
  return records;
}

export function sortCatalogRecords(
  records: CatalogRecord[],
  sort: CatalogSort,
): CatalogRecord[] {
  const copy = [...records];
  const nameCmp = (a: CatalogRecord, b: CatalogRecord) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
  switch (sort) {
    case "name-asc":
      return copy.sort(nameCmp);
    case "name-desc":
      return copy.sort((a, b) => nameCmp(b, a));
    case "enabled-first":
      return copy.sort((a, b) => {
        if (a.enabled !== b.enabled) {
          return a.enabled ? -1 : 1;
        }
        return nameCmp(a, b);
      });
    case "disabled-first":
      return copy.sort((a, b) => {
        if (a.enabled !== b.enabled) {
          return a.enabled ? 1 : -1;
        }
        return nameCmp(a, b);
      });
    default:
      return copy;
  }
}

export function buildCatalogView(
  records: CatalogRecord[],
  {
    search,
    visibility,
    sort,
  }: {
    search: string;
    visibility: CatalogVisibilityFilter;
    sort: CatalogSort;
  },
): CatalogRecord[] {
  return sortCatalogRecords(
    filterCatalogByVisibility(filterCatalogBySearch(records, search), visibility),
    sort,
  );
}
