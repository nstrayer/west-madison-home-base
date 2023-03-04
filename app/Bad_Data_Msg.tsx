"use client";
import React from "react";
import styles from "./Bad_Data_Msg.module.css";

export function Bad_Data_Msg({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <h1>Problem fetching data...</h1>
      {children}
    </div>
  );
}
