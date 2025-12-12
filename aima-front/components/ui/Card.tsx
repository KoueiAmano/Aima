"use client";

import React from "react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={[
        "w-full rounded-3xl bg-card-bg shadow-[var(--color-card-shadow)] px-6 py-8 space-y-7 backdrop-blur-[2px]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

export default Card;
