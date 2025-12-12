"use client";

import React from "react";
import { SelectOption } from "./SelectOption";

type OptionItem<T extends string | number> = {
  id: T;
  label: string;
};

type OptionGridProps<T extends string | number> = {
  options: OptionItem<T>[];
  selected: T | null;
  onSelect: (id: T) => void;
  containerClassName?: string;
  itemClassName?: string;
};

export function OptionGrid<T extends string | number>({
  options,
  selected,
  onSelect,
  containerClassName = "grid grid-cols-3 gap-3",
  itemClassName = "py-3 text-sm",
}: OptionGridProps<T>) {
  return (
    <div className={containerClassName}>
      {options.map((opt) => (
        <SelectOption
          key={String(opt.id)}
          isSelected={selected === opt.id}
          onClick={() => onSelect(opt.id)}
          className={itemClassName}
        >
          {opt.label}
        </SelectOption>
      ))}
    </div>
  );
}

export default OptionGrid;
