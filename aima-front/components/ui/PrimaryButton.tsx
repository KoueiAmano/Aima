"use client";

import React from "react";

type PrimaryButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  children: React.ReactNode;
};

export function PrimaryButton({ loading, children, className = "", ...rest }: PrimaryButtonProps) {
  return (
    <button
      {...rest}
      className={`min-w-[240px] sm:min-w-[260px] rounded-full py-3 px-8 sm:py-3.5 sm:px-10 text-sm sm:text-[15px] font-semibold transition ${className}`}
    >
      {loading ? "登録中..." : children}
    </button>
  );
}

export default PrimaryButton;
