import { listInstalled } from "@/lib/management";
import { buildStandaloneCatalogHtml } from "./build-standalone-html";
import { downloadTextFile } from "./download-html-file";

function catalogDownloadFilename(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `manex-my-extensions-${y}-${m}-${day}.html`;
}

export type DownloadCatalogResult =
  | { ok: true }
  | { ok: false; message: string };

/**
 * Fetches installed extensions, builds the Phase 2 standalone HTML, and starts a download.
 * Shared by the toolbar popup and the options (dashboard) page.
 */
export async function downloadExtensionCatalogHtml(): Promise<DownloadCatalogResult> {
  try {
    const records = await listInstalled();
    const html = buildStandaloneCatalogHtml(records);
    downloadTextFile(html, catalogDownloadFilename());
    return { ok: true };
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : "Could not export your extensions.";
    return { ok: false, message };
  }
}
