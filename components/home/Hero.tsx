import { Button } from '@/components/ui/Button';
import { Photo } from '@/components/ui/Photo';
import { hero } from '@/lib/mock-data/home';

export function Hero() {
  return (
    <section className="bg-brand-blush pb-10 pt-14 sm:pt-24">
      <div className="container-page text-center">
        <h1 className="mx-auto max-w-3xl text-[28px] leading-tight text-brand-navy sm:text-[32px]">{hero.title}</h1>
        <p className="mx-auto mt-7 max-w-[760px] text-base leading-relaxed text-brand-ink sm:text-lg">{hero.body}</p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Button href="/join">Join the Community</Button>
          <Button href="/courses" variant="outline-red">
            Learn more &gt;&gt;
          </Button>
        </div>
        <Photo
            src="/images/hero.jpg"
          alt="Members of the africanqueen community at a networking evening"
          hint="Replace with /public/images/hero.jpg"
          className="mx-auto mt-16 aspect-[16/9] w-full rounded-3xl sm:rounded-[28px]"
          tone="navy"
        />
      </div>
    </section>
  );
}
