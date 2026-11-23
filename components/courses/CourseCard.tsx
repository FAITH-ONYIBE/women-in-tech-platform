'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Photo } from '@/components/ui/Photo';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { enqueue } from '@/lib/offline/outbox';
import type { Course } from '@/lib/mock-data/courses';

export function CourseCard({ course }: { course: Course }) {
  const online = useOnlineStatus();
  const [open, setOpen] = useState(false);
  const [queued, setQueued] = useState(false);
  const { tile } = course;

  async function onEnroll() {
    setOpen(true);
    if (!online) {
      try {
        await enqueue('course-interest', { courseId: course.id });
        setQueued(true);
      } catch {
        setQueued(false);
      }
    }
  }

  return (
    <article>
      {course.image ? (
        <Photo src={course.image} alt="" className="aspect-[318/178] w-full rounded-2xl" />
      ) : (
        <div
          className="flex aspect-[318/178] w-full flex-col items-center justify-center rounded-2xl text-white"
          style={{ backgroundImage: `linear-gradient(135deg, ${tile.from}, ${tile.to})` }}
          role="img"
          aria-label={`${course.title} course banner`}
        >
          <span className="text-3xl font-extrabold tracking-[0.08em]">{tile.label}</span>
          {tile.sub && <span className="mt-2 text-sm font-medium text-white/85">{tile.sub}</span>}
        </div>
      )}
      <h2 className="mt-4 text-base font-medium tracking-normal text-brand-ink/90">{course.title}</h2>
      <p className="mt-3 text-sm text-brand-muted">{course.category}</p>
      {course.enrollable && (
        <Button size="md" variant="outline" className="mt-4" onClick={onEnroll}>
          Enroll
        </Button>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title={online ? 'Log in to enroll' : 'You’re offline'}>
        {online ? (
          <>
            <p>Enrolling in <strong>{course.title}</strong> needs a member account. Log in or join for free to continue.</p>
            <div className="mt-5 flex gap-3">
              <Button href="/login" size="sm">Log in</Button>
              <Button href="/join" size="sm" variant="outline">Join free</Button>
            </div>
          </>
        ) : (
          <>
            <p>
              Enrolment needs an internet connection and a signed-in account.{' '}
              {queued
                ? `We saved your interest in ${course.title} on this device and will send it when you’re back online.`
                : 'We could not save your interest on this device. Please try again when you are online.'}
            </p>
            <div className="mt-5">
              <Button size="sm" variant="outline" onClick={() => setOpen(false)}>Got it</Button>
            </div>
          </>
        )}
      </Modal>
    </article>
  );
}
