export function dateToMs(value: unknown) {
  const parsed = Date.parse(typeof value === "string" ? value : "");
  return Number.isFinite(parsed) ? parsed : 0;
}

function toLocation(country: string, region: string) {
  return `${country}:::${region}`;
}

function fromLocation(value: string) {
  const [country, region] = value.split(":::");
  return { country: country || "Unknown", region: region || "Unknown" };
}

export function locationKey(country: string, region: string) {
  return toLocation(country, region);
}

export function mostFrequentLocation(locations: Map<string, number>) {
  const entries = [...locations.entries()];
  if (entries.length === 0) return { country: "Unknown", region: "Unknown" };
  entries.sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]));
  return fromLocation(entries[0]?.[0] ?? "");
}
