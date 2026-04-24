interface LoadSafelyParams<TData> {
  load: () => Promise<TData>;
  defaultValue: TData;
}

export async function loadSafely<TData>({
  load,
  defaultValue,
}: LoadSafelyParams<TData>) {
  try {
    return await load();
  } catch {
    return defaultValue;
  }
}
