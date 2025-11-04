"use client";
import { HistoryList } from "@/app/components/history/HistoryList";
import React from "react";

export default function HistoryPage() {
  return (
    <div>
      <HistoryList typeId={1} />
    </div>
  );
}
