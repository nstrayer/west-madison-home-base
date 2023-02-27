import { format_time } from "@/utils/format_time";
import Image from "next/image";
import { get_latest_readings } from "../utils/get_latest_readings";
import { Data_Box, Data_Box_Container } from "./Data_Box";
import { Measure_Summary } from "./Measure_Summary";
import styles from "./page.module.css";

export default async function Home() {
  const latest_data = await get_latest_readings(4);

  const { num_obs, times } = latest_data;
  return (
    <main className={styles.main}>
      <h1 className={styles.header}>West Madison Home Base</h1>
      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/madison-house.png"
          alt="House Logo"
          width={767 / 2}
          height={892 / 2}
          priority
        />
      </div>
      <div className={styles.data_display}>
        <h2>Observation Statistics</h2>
        <Data_Box_Container>
          <Data_Box description="Total Number" value={num_obs} unit={"obs"} />
          <Data_Box
            description="Elapsed Hours"
            value={times.hrs_elapsed}
            unit={"hrs"}
          />
          <Data_Box description="Earliest" value={times.earliest} />
          <Data_Box description="Latest" value={times.latest} />
        </Data_Box_Container>
        <Measure_Summary
          name="Temperature"
          readings={latest_data.readings}
          measure={"temp"}
        />
        <Measure_Summary
          name="Co2"
          readings={latest_data.readings}
          measure={"co2"}
        />
        <Measure_Summary
          name="Humidity"
          readings={latest_data.readings}
          measure="humidity"
        />
      </div>
    </main>
  );
}
