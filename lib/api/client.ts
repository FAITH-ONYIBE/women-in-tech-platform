import type { OutboxAction } from '@/lib/offline/outbox';

/**
 * Backend seam. Frontend-only phase: this simulates a network round trip.
 * Replace the body with a real `fetch('/api/...')` when the backend exists.
 */
export async function sendQueuedAction(_action: OutboxAction): Promise<void> {
  await new Promise((r) => setTimeout(r, 400));
}
