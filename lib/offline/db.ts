/**
 * Minimal promise wrapper over IndexedDB.
 * Stores: outbox (queued actions), saved (bookmarked items), drafts (form drafts).
 */
const DB_NAME = 'africanqueen';
const DB_VERSION = 1;
export type StoreName = 'outbox' | 'saved' | 'drafts';

function open(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') return reject(new Error('IndexedDB unavailable'));
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      (['outbox', 'saved', 'drafts'] as StoreName[]).forEach((s) => {
        if (!db.objectStoreNames.contains(s)) db.createObjectStore(s, { keyPath: 'id' });
      });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function run<T>(store: StoreName, mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const db = await open();
  return new Promise<T>((resolve, reject) => {
    const tx = db.transaction(store, mode);
    const req = fn(tx.objectStore(store));
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
    tx.oncomplete = () => db.close();
  });
}

export const idb = {
  put: <T extends { id: string }>(store: StoreName, value: T) => run(store, 'readwrite', (s) => s.put(value)),
  get: <T>(store: StoreName, id: string) => run<T | undefined>(store, 'readonly', (s) => s.get(id)),
  getAll: <T>(store: StoreName) => run<T[]>(store, 'readonly', (s) => s.getAll()),
  remove: (store: StoreName, id: string) => run(store, 'readwrite', (s) => s.delete(id)),
};
