"use client";

import {
  NameType,
  Payload,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

interface ChartTooltipRowProps {
  value: string;
  name: string;
}

const ChartTooltipRow = ({ value, name }: ChartTooltipRowProps) => (
  <div className="flex items-center justify-between space-x-8">
    <div className="flex items-center space-x-2">
      <p className="font-medium tabular-nums text-right whitespace-nowrap">
        {value}
      </p>
    </div>
    <p className="text-right whitespace-nowrap first-letter:capitalize">
      {name.replaceAll("_", " ")}
    </p>
  </div>
);

export interface ChartTooltipProps {
  active: boolean;
  payload: Payload<ValueType, NameType>[] | undefined;
  label: string;
  valueFormatter: (value: number) => string;
}

const ChartTooltip = ({
  active,
  payload,
  label,
  valueFormatter,
}: ChartTooltipProps) => {
  if (active && payload) {
    return (
      <div className="bg-background text-sm rounded-md border shadow-md">
        <div className="px-4 py-2 border-b">
          <p className="font-medium">{label}</p>
        </div>

        <div className="px-4 py-2 space-y-1">
          {payload.map((entry) => (
            <ChartTooltipRow
              key={`id-${entry.name}`}
              value={
                typeof entry.value === "number"
                  ? valueFormatter(entry.value)
                  : "error"
              } // this should be a number
              name={entry.name?.toString() ?? "error"}
            />
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default ChartTooltip;
