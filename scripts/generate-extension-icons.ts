import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";

const rootDir = fileURLToPath(new URL("..", import.meta.url));
const svgPath = join(rootDir, "assets/logo.svg");
const publicDir = join(rootDir, "public");
const iconDir = join(publicDir, "icon");

const sizes = [16, 32, 48, 96, 128] as const;

async function main() {
  const svg = await readFile(svgPath, "utf8");
  await mkdir(iconDir, { recursive: true });

  for (const size of sizes) {
    const resvg = new Resvg(svg, {
      fitTo: {
        mode: "width",
        value: size,
      },
    });
    const rendered = resvg.render();
    if (rendered.width !== size || rendered.height !== size) {
      throw new Error(
        `Expected ${size}×${size} PNG, got ${rendered.width}×${rendered.height} (assets/logo.svg should use a square viewBox)`,
      );
    }
    await writeFile(join(iconDir, `${size}.png`), rendered.asPng());
  }

  await writeFile(join(publicDir, "logo.svg"), svg);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
