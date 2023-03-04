"use client";

import { get_data } from "@/utils/get_data";
import { parse_observations } from "@/utils/parse_observations";
import { observation_times } from "@/utils/observation_times";
import { Data_Box_Container, Data_Box } from "./Data_Box";
import { Measure_Summary } from "./Measure_Summary";
import React from "react";
import useSWR, { Fetcher } from "swr";
import { LoadingComponent } from "./LoadingComponent";
import { Bad_Data_Msg } from "./Bad_Data_Msg";

const fetcher: Fetcher<string[], string> = (num_hours) =>
  get_data(Number(num_hours));

export default function Data_Display_Client() {
  const { data, error, isLoading } = useSWR(String(4), fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Unknown error occured in data display component");
  }

  if (data === undefined) {
    return <Bad_Data_Msg>Database request came back empty</Bad_Data_Msg>;
  }

  const observations = parse_observations(data);
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
