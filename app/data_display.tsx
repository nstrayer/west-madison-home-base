import { get_data } from "@/utils/get_data";
import { parse_observations } from "@/utils/parse_observations";
import { observation_times } from "@/utils/observation_times";
import { Data_Box_Container, Data_Box } from "./Data_Box";
import { Measure_Summary } from "./Measure_Summary";

export default async function Data_Display() {
  const latest_data = await get_data(4);

  const observations = parse_observations(latest_data);

  const times = observation_times(observations);

  return (
    <>
      <h2>Observation Statistics</h2>
      <Data_Box_Container>
        <Data_Box
          description="Total Number"
          value={observations.length}
          unit="obs"
        />
        <Data_Box
          description="Elapsed Hours"
          value={times.hrs_elapsed}
          unit="hrs"
        />
        <Data_Box description="Earliest" value={times.earliest} />
        <Data_Box description="Latest" value={times.latest} />
      </Data_Box_Container>
      <Measure_Summary
        name="Temperature"
        readings={observations}
        measure="temp"
      />
      <Measure_Summary name="Co2" readings={observations} measure="co2" />
      <Measure_Summary
        name="Humidity"
        readings={observations}
        measure="humidity"
      />
    </>
  );
}
