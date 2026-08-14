import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

test("builds a deployable Snapbuild landing", async () => {
  const html = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");
  assert.match(html, /<html lang="ru">/i);
  assert.match(html, /Снэпбилд — материалы в рамках вашей дизайн-системы/i);
  assert.match(html, /<div id="root"><\/div>/i);
  assert.match(html, /\.\/assets\/[^"']+\.js/i);
  assert.match(html, /\.\/assets\/[^"']+\.css/i);
  assert.match(html, /url\("\.\/assets\/tt-commons-3\.woff2"\)/i);
  assert.doesNotMatch(html, /(?:src|href)=['"]\/assets\//i);

  const assetDir = new URL("../dist/assets/", import.meta.url);
  const bundleName = (await readdir(assetDir)).find((file) => file.endsWith(".js"));
  assert.ok(bundleName, "production JavaScript bundle is missing");
  const bundle = await readFile(new URL(bundleName, assetDir), "utf8");
  assert.match(bundle, /\.\/assets\//i);
  assert.doesNotMatch(bundle, /["'`]\/assets\//i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});
