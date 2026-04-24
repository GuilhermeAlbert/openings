import type { FilterOption } from "@/app/opportunities/_components/opportunities-screen/types";
import { canonicalTagLabel } from "./tag-labels";

function normalizeBase(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9+#./\s-]+/g, " ")
    .replace(/[./_]+/g, " ")
    .replace(/[-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanLabel(value: string) {
  const cleaned = value.trim().replace(/^[^\p{Letter}\p{Number}]+/gu, "").trim();
  return cleaned || value.trim();
}

export function canonicalTagValue(value: string) {
  const base = normalizeBase(value);
  if (!base) return "";
  if (/(^| )junior( |$)|(^| )jr( |$)/.test(base)) return "junior";
  if (base.includes("pleno") || /(^| )mid(dle)?( |$)/.test(base)) return "pleno";
  if (base.includes("senior")) return "senior";
  if (base.includes("especialista") || base.includes("specialist")) return "especialista";
  if (base.includes("estagio") || base.includes("intern") || base.includes("trainee")) return "estagio";
  if (/(^| )lead( |$)/.test(base)) return "lead";
  if (base.includes("principal")) return "principal";
  if (/(^| )staff( |$)/.test(base)) return "staff";
  if (base.includes("remoto") || base.includes("remote")) return "remote";
  if (base.includes("hibrido") || base.includes("hybrid")) return "hybrid";
  if (base.includes("onsite") || base.includes("on site") || base.includes("presencial")) {
    return "on-site";
  }
  return base.replace(/\s+/g, "-");
}

export function condenseTagOptions(counts: Record<string, number>, locale: string) {
  const grouped = new Map<string, { fallbackLabel: string; count: number; labelScore: number }>();

  for (const [rawValue, count] of Object.entries(counts)) {
    if (!Number.isFinite(count) || count <= 0) continue;
    const value = canonicalTagValue(rawValue);
    if (!value) continue;
    const fallbackLabel = cleanLabel(rawValue);
    const previous = grouped.get(value);
    if (!previous) {
      grouped.set(value, { fallbackLabel, count, labelScore: count });
      continue;
    }
    previous.count += count;
    if (count > previous.labelScore) {
      previous.fallbackLabel = fallbackLabel;
      previous.labelScore = count;
    }
  }

  const condensed = [...grouped.entries()]
    .map(([value, entry]) => ({
      value,
      label: canonicalTagLabel(value, entry.fallbackLabel, locale),
      count: entry.count,
    }))
    .sort((left, right) => left.label.localeCompare(right.label, locale));

  return condensed satisfies FilterOption[];
}
