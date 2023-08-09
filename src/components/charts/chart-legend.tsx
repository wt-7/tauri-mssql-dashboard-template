"use client";

import { Payload } from "recharts/types/component/DefaultLegendContent";

interface ChartLegendProps {
  payload: Payload[] | undefined;
}

export function ChartLegend({ payload }: ChartLegendProps) {
  if (payload) {
    return payload.map((entry) => (
      <div key={entry.value} className="flex items-center justify-end">
        <div
          className="w-3 h-3  rounded-sm mr-2"
          style={{ backgroundColor: entry.color }} // tailwind doesnt support dynamic colours
        />
        <p className="text-xs first-letter:capitalize">{entry.value}</p>
      </div>
    ));
  }
}
