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
    <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-blue-500 via-purple-500">
      <div className="relative z-10">
        <h1 className="text-4xl font-bold">{title}</h1>
        {subtitle && (
          <p className="mt-2 text-lg text-blue-100 max-w-2xl">{subtitle}</p>
        )}
        {children}
      </div>
      <div></div>
    </div>
  );
}
