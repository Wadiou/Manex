import { useCallback, useEffect, useState } from "react";
import type { CatalogRecord } from "@/lib/catalog/catalog-types";
import { listInstalled, setExtensionEnabled } from "@/lib/management";

export type UseExtensionCatalogResult = {
  records: CatalogRecord[];
  loading: boolean;
  loadError: string | null;
  actionError: string | null;
  togglingId: string | null;
  refresh: () => Promise<void>;
  setEnabled: (record: CatalogRecord, next: boolean) => Promise<void>;
};

/**
 * Load / refresh the installed list and perform enable–disable with policy-aware errors.
 */
export function useExtensionCatalog(): UseExtensionCatalogResult {
  const [records, setRecords] = useState<CatalogRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoadError(null);
    setLoading(true);
    try {
      const list = await listInstalled();
      setRecords(list);
    } catch (e) {
      const message =
        e instanceof Error
          ? e.message
          : "Could not read your installed extensions.";
      setLoadError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const setEnabled = useCallback(
    async (record: CatalogRecord, next: boolean) => {
      if (next === record.enabled) return;
      setActionError(null);
      setTogglingId(record.id);
      try {
        await setExtensionEnabled(record.id, next);
        const list = await listInstalled();
        setRecords(list);
      } catch (e) {
        const message =
          e instanceof Error
            ? e.message
            : "Could not update this extension.";
        setActionError(message);
      } finally {
        setTogglingId(null);
      }
    },
    [],
  );

  return {
    records,
    loading,
    loadError,
    actionError,
    togglingId,
    refresh,
    setEnabled,
  };
}
