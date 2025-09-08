'use client';
import clsx from 'clsx';
import { PropsWithChildren } from 'react';

export default function CardShell(
  { children, label, href }: PropsWithChildren<{ label: string; href?: string }>
) {
  const Wrapper: any = href ? 'a' : 'div';
  return (
    <Wrapper
      {...(href ? { href, target: '_blank', rel: 'noreferrer noopener' } : {})}
      className={clsx(
        'group relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/10',
        'bg-white/80 dark:bg-black/40 backdrop-blur shadow-sm',
        'hover:shadow-md transition will-change-transform'
      )}
    >
      {/* animation layer */}
      <div className="absolute inset-0">{children}</div>

      {/* corner label (Sequoia-style) */}
      <div className="absolute left-4 bottom-4">
        <span className="inline-block px-3 py-1 rounded-full text-white text-sm font-medium"
              style={{ background: 'linear-gradient(90deg, var(--jbv-accent), var(--jbv-accent-2))' }}>
          {label}
        </span>
      </div>
      {/* aspect/padding box to keep height */}
      <div className="invisible select-none pointer-events-none block pb-[62%]" />
    </Wrapper>
  );
}

