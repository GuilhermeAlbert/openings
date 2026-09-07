export function selectStaticEntityParams<T>(params: Array<T>): Array<T> {
  return process.env.OPENINGS_CLOUDFLARE_SHELL_ONLY === "1"
    ? params.slice(0, 1)
    : params;
}
