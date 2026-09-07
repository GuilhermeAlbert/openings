import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const OUTPUT_DIRECTORY = path.join(process.cwd(), "out");
const AVAILABLE_EXPORTED_LOCALES = ["en", "pt", "es", "it", "fr", "de"];

async function listHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return listHtmlFiles(entryPath);
    return entry.isFile() && entry.name.endsWith(".html") ? [entryPath] : [];
  }));
  return files.flat();
}

let updatedFiles = 0;
for (const locale of AVAILABLE_EXPORTED_LOCALES) {
  const localeDirectory = path.join(OUTPUT_DIRECTORY, locale);
  const htmlFiles = await listHtmlFiles(localeDirectory);
  for (const htmlPath of htmlFiles) {
    const html = await readFile(htmlPath, "utf8");
    const localizedHtml = html.replace(/<html lang="[^"]*"/u, `<html lang="${locale}"`);
    if (localizedHtml !== html) {
      await writeFile(htmlPath, localizedHtml);
      updatedFiles += 1;
    }
  }
}

console.log(`Localized ${updatedFiles} exported HTML documents.`);
