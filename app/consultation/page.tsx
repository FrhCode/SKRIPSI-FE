import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import React, { useEffect } from "react";
import ConsultationForm from "./components/ConsultationForm";
import { getAllSymptoms } from "@/service/symptom/getAllSymptom";

export default async function page() {
  const symptoms = await getAllSymptoms();

  return (
    <>
      <Header />
      <ConsultationForm symptoms={symptoms} />
      <div className="h-40 lg:h-48"></div>
      <Footer />
    </>
  );
}
