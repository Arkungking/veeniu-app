export function useLocalStorage<T = any>(key: string): T | null {
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem("user");
  if (!stored) return null;

  try {
    const parsed = JSON.parse(stored);
    return parsed[key] ?? null;
  } catch (error) {
    console.error("Failed to parse localStorage data:", error);
    return null;
  }
}
