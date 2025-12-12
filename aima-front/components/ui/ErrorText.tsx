"use client";

import React from "react";

type ErrorTextProps = {
  children: React.ReactNode;
  className?: string;
};

export function ErrorText({ children, className = "" }: ErrorTextProps) {
  return (
    <p className={["text-xs text-red-500 bg-red-50 border border-red-100 rounded-xl px-3 py-2", className].join(" ")}>
      {children}
    </p>
  );
}

export default ErrorText;
