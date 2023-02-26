import { format_num } from "@/utils/format_num";
import { merge_classes } from "@/utils/merge_classes";
import styles from "./Data_Box.module.css";

export function Data_Box({
  description,
  value,
  unit,
}: {
  description: string;
  value: number | string | React.ReactNode;
  unit?: string;
}) {
  return (
    <div className={styles.box}>
      <span className={styles.description}>{description}</span>
      <span className={styles.value}>
        {typeof value === "number" ? format_num(value) : value}
        {unit ? <span className={styles.unit}>{unit}</span> : null}
      </span>
    </div>
  );
}

export function Data_Box_Container({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return <div className={merge_classes(styles.holder, className)} {...props} />;
}
