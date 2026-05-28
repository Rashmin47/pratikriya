import { ReactNode } from "react";

interface GradientHeaderProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}
export function GradientHeader({
  title,
  subtitle,
  children,
}: GradientHeaderProps) {
  return (
    <section className="relative isolate overflow-hidden rounded-[2rem] border border-stone-400/20 bg-[linear-gradient(135deg,rgba(28,25,23,0.98),rgba(55,48,40,0.96)_55%,rgba(91,66,34,0.95))] px-6 py-10 text-white shadow-[0_28px_80px_-34px_rgba(28,25,23,0.72)] sm:px-8 sm:py-12 lg:px-10 lg:py-14">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,119,6,0.16),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(132,204,22,0.09),transparent_30%)]" />
      <div className="absolute left-0 top-0 h-full w-1 bg-linear-to-b from-amber-300/80 via-stone-100/30 to-emerald-300/60" />
      <div className="absolute -left-16 top-10 h-56 w-56 rounded-full bg-amber-200/10 blur-3xl" />
      <div className="absolute -right-8 bottom-0 h-56 w-56 rounded-full bg-emerald-300/10 blur-3xl" />
      <div className="relative z-10 space-y-6">
        <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.26em] text-white/80 backdrop-blur">
          Open product council
        </div>
        <div className="space-y-4">
          <h1 className="max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="max-w-2xl text-base leading-7 text-stone-200 sm:text-lg">
              {subtitle}
            </p>
          )}
        </div>
        {children && <div className="pt-2">{children}</div>}
      </div>
    </section>
  );
}
