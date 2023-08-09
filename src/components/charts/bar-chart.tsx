"use client";

import {
  Bar,
  CartesianGrid,
  Legend,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import ChartTooltip from "./chart-tooltip";

import { ChartLegend } from "./chart-legend";

interface BarChartProps<TData> {
  data: TData[];
  xAxis: string;
  yAxis: string;
  valueFormatter?: (value: number) => string;
  yAxisWidth?: number;
  colour?: string;
}

export function BarChart<TData>({
  data,
  xAxis,
  yAxis,
  valueFormatter = (value: number) => value.toString(),
  yAxisWidth = 60, // this is default for recharts
  colour = "#818cf8",
}: BarChartProps<TData>) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <RechartsBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" horizontal vertical={false} />
        <XAxis
          dataKey={xAxis}
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          type="category"
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={valueFormatter}
          width={yAxisWidth}
          type="number"
        />

        <Bar dataKey={yAxis} fill={colour} radius={[4, 4, 0, 0]} />

        <Legend
          verticalAlign="top"
          height={60}
          content={({ payload }) => <ChartLegend payload={payload} />}
        />

        <Tooltip
          wrapperStyle={{ outline: "none" }}
          isAnimationActive={false}
          cursor={{ fill: "#d1d5db", opacity: "0.15" }}
          content={({ active, payload, label }) => (
            <ChartTooltip
              active={active ?? false}
              payload={payload}
              label={label}
              valueFormatter={valueFormatter}
            />
          )}
          position={{ y: 0 }}
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
