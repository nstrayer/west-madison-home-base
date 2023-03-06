import { format_timestamp } from "@/utils/format_time";
import { get_ranges } from "@/utils/get_ranges";
import { merge_classes } from "@/utils/merge_classes";
import {
  ObservationMeasure,
  ParsedObservation,
} from "@/utils/parse_observations";
import { Inter } from "next/font/google";

import { Data_Box, Data_Box_Container } from "./Data_Box";
import { Measure_Chart } from "./Measure_Chart";
import styles from "./Measure_Summary.module.css";

const inter = Inter({ subsets: ["latin"] });

const measure_info: Record<
  ObservationMeasure,
  { unit: string; description: string }
> = {
  temp: {
    unit: "°",
    description: "in degrees fahrenheit",
  },
  co2: {
    unit: "ppm",
    description: "concentration in parts per million",
  },
  humidity: {
    unit: "%",
    description: "relative humidity",
  },
};

export function Measure_Summary({
  measure,
  readings,
  name = measure,
}: {
  readings: ParsedObservation[];
  measure: ObservationMeasure;
  name?: string;
}) {
  const { description } = measure_info[measure];
  const { min, max } = get_ranges(readings, measure);

  return (
    <div className={styles.measure_summary}>
      <div className={styles.header}>
        <h2 className={merge_classes(styles.name, inter.className)}>{name}</h2>
        <span>{description}</span>
      </div>
      <Data_Box_Container>
        <Data_Box
          description="Low"
          value={min.val}
          unit={format_timestamp(min.timestamp)}
        />
        <Data_Box
          description="High"
          value={max.val}
          unit={format_timestamp(max.timestamp)}
        />
      </Data_Box_Container>
      <div className={styles.chart}>
        <Measure_Chart readings={readings} measure={measure} />
      </div>
    </div>
  );
}
