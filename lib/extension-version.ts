import pkg from "../package.json" with { type: "json" };

/** Extension semver; single source from package.json → WXT manifest and UI. */
export const EXTENSION_VERSION: string = pkg.version;
