import type { Metadata } from 'next';
import { CourseCard } from '@/components/courses/CourseCard';
import { PageTitleCard } from '@/components/ui/PageTitleCard';
import { courses } from '@/lib/mock-data/courses';

export const metadata: Metadata = { title: 'Courses' };

export default function CoursesPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-brand-mist pb-20">
      <PageTitleCard title="Courses" />
      <div className="container-catalog mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-9">
        {courses.map((c) => (
          <CourseCard key={c.id} course={c} />
        ))}
      </div>
    </div>
  );
}
