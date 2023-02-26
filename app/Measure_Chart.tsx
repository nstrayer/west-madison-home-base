"use client";

import { format_num } from "@/utils/format_num";
import { ParsedReading } from "@/utils/get_latest_readings";
import { format_time, parse_time_stamp } from "@/utils/parse_time_stamp";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ContentType } from "recharts/types/component/Tooltip";
import styles from "./Measure_Chart.module.css";

export function Measure_Chart({
  readings,
  measure,
}: {
  readings: ParsedReading[];
  measure: string;
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={400} height={250} data={readings}>
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis
          dataKey="timestamp"
          domain={["auto", "auto"]}
          tickFormatter={(timestamp) =>
            format_time(parse_time_stamp(timestamp))
          }
          name="Time"
          type="number"
        />
        <YAxis domain={["auto", "auto"]} />
        <Tooltip content={CustomTooltip} />
        <Line type="monotone" dataKey={measure} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

const CustomTooltip: ContentType<number, string> = (props) => {
  const { active, payload } = props;

  if (active && payload && payload.length) {
    const timestamp = format_time(parse_time_stamp(props.label as number));
    const value = format_num(Number(payload[0].value), 2);
    return (
      <div className={styles.tooltip}>
        {value} @ {timestamp}
      </div>
    );
  }

  return null;
};
