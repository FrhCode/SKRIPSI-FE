import React, { useEffect } from "react";
import ConsultationForm from "./components/ConsultationForm";
import { getAllSymptoms } from "@/service/symptom/getAllSymptom";

export default async function page() {
  const symptoms = await getAllSymptoms();

  return (
    <>
      <ConsultationForm symptoms={symptoms} />
    </>
  );
}
