import { idb } from './db';

export type OutboxAction = {
  id: string;
  type: 'course-interest';
  payload: Record<string, unknown>;
  createdAt: number;
};

export const OUTBOX_EVENT = 'aq:outbox-changed';
const notify = () => window.dispatchEvent(new Event(OUTBOX_EVENT));

export async function enqueue(type: OutboxAction['type'], payload: Record<string, unknown>) {
  const action: OutboxAction = { id: `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, type, payload, createdAt: Date.now() };
  await idb.put('outbox', action);
  notify();
  return action;
}

export const pendingActions = () => idb.getAll<OutboxAction>('outbox');

/**
 * Replays queued actions through `send`. Actions that fail stay queued.
 * `send` is a stub today (lib/api/client.ts) and becomes a real fetch() later.
 */
export async function flushOutbox(send: (a: OutboxAction) => Promise<void>) {
  const items = (await pendingActions()).sort((a, b) => a.createdAt - b.createdAt);
  let done = 0;
  for (const item of items) {
    try {
      await send(item);
      await idb.remove('outbox', item.id);
      done++;
    } catch {
      break; // stop at first failure, keep order
    }
  }
  notify();
  return done;
}
