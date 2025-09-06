type Entry<T> = { value: T; expiresAt: number };

class SimpleCache {
  private store = new Map<string, Entry<any>>();

  get<T>(key: string): T | undefined {
    const e = this.store.get(key);
    if (!e) return undefined;
    if (Date.now() > e.expiresAt) {
      this.store.delete(key);
      return undefined;
    }
    return e.value as T;
  }

  set<T>(key: string, value: T, ttlMs: number) {
    this.store.set(key, { value, expiresAt: Date.now() + ttlMs });
  }
}

export const simpleCache = new SimpleCache();

