import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("builds a deployable Snapbuild landing", async () => {
  const html = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");
  assert.match(html, /<html lang="ru">/i);
  assert.match(html, /Снэпбилд — материалы в рамках вашей дизайн-системы/i);
  assert.match(html, /<div id="root"><\/div>/i);
  assert.match(html, /\.\/assets\/[^"']+\.js/i);
  assert.match(html, /\.\/assets\/[^"']+\.css/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});
