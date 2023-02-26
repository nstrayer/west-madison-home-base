import {
  measure_info,
  ParsedReading,
  ReadingMeasure,
} from "@/utils/get_latest_readings";
import { get_ranges } from "@/utils/get_ranges";
import { merge_classes } from "@/utils/merge_classes";
import { Inter } from "next/font/google";

import { Data_Box, Data_Box_Container } from "./Data_Box";
import { Measure_Chart } from "./Measure_Chart";
import styles from "./Measure_Summary.module.css";

const inter = Inter({ subsets: ["latin"] });

export function Measure_Summary({
  measure,
  readings,
  name = measure,
}: {
  readings: ParsedReading[];
  measure: ReadingMeasure;
  name?: string;
}) {
  const { unit, description } = measure_info[measure];
  const { min, max } = get_ranges(readings, measure);

  return (
    <div className={styles.measure_summary}>
      <div className={styles.header}>
        <h2 className={merge_classes(styles.name, inter.className)}>{name}</h2>
        <span>{description}</span>
      </div>
      <Data_Box_Container>
        <Data_Box description="Low" value={min} unit={unit} />
        <Data_Box description="High" value={max} unit={unit} />
      </Data_Box_Container>
      <div className={styles.chart}>
        <Measure_Chart readings={readings} measure={measure} />
      </div>
    </div>
  );
}
