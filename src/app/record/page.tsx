import { RecordForm } from "@/app/components/record/RecordForm";
import React from "react";

export default async function RecordPage() {
  return (
    <div>
      <RecordForm typeId={1}/>
    </div>
  );
}