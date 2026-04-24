export type CatalogIcon = {
  size: number;
  /** `chrome-extension://` URL; valid inside the extension for `<img>`. */
  url: string;
};

type ExtensionInfo = chrome.management.ExtensionInfo;

/**
 * In-memory / UI snapshot of an installed item (from `chrome.management.getAll` mapping).
 */
export type CatalogRecord = {
  id: string;
  name: string;
  shortName?: string;
  version: string;
  versionName?: string;
  enabled: boolean;
  description: string;
  icons: CatalogIcon[];
  installType: ExtensionInfo["installType"];
  type: string;
  homepageUrl?: string;
  mayDisable: boolean;
  mayEnable?: boolean;
  offlineEnabled: boolean;
};

export function mapExtensionInfoToCatalogRecord(
  info: ExtensionInfo,
): CatalogRecord {
  return {
    id: info.id,
    name: info.name,
    shortName: info.shortName,
    version: info.version,
    versionName: info.versionName,
    enabled: info.enabled,
    description: info.description,
    icons: (info.icons ?? []).map((i) => ({ size: i.size, url: i.url })),
    installType: info.installType,
    type: info.type,
    homepageUrl: info.homepageUrl,
    mayDisable: info.mayDisable,
    mayEnable: info.mayEnable,
    offlineEnabled: info.offlineEnabled,
  };
}
