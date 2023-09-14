import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import React from "react";
import ConsultationForm from "./components/ConsultationForm";

export default function page() {
  return (
    <>
      <Header />
      <ConsultationForm />
      <div className="h-40 lg:h-48"></div>
      <Footer />
    </>
  );
}
