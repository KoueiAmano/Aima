"use client";

import React from "react";

type StepSectionProps = {
  step?: number;
  title: string;
  children: React.ReactNode;
};

export function StepSection({ step, title, children }: StepSectionProps) {
  return (
    <section className="space-y-2">
      {step !== undefined && (
        <p className="text-[10px] sm:text-xs font-semibold text-text-accent tracking-[0.18em] uppercase">
          STEP {step}
        </p>
      )}
      <p className="text-sm sm:text-base text-text-main">{title}</p>
      {children}
    </section>
  );
}

export default StepSection;
