// components/ui/SelectOption.tsx
"use client";

import React from "react";

type SelectOptionProps = {
  isSelected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
};

export function SelectOption({
  isSelected,
  onClick,
  children,
  className = "",
}: SelectOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isSelected}
      className={[
        "relative w-full rounded-xl border font-semibold transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        "active:scale-[0.98]",
        isSelected
          ? "bg-primary/90 border-primary text-white shadow-md"
          : "bg-white/80 border-primary-light text-text-main hover:bg-primary-light/60",
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}
