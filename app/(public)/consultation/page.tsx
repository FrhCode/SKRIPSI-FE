import ConsultationForm from "./components/ConsultationForm";
import { getAllSymptoms } from "@/service/symptom/getAllSymptom";

export default async function page() {
  const { content: symptoms } = await getAllSymptoms();

  return (
    <>
      <ConsultationForm symptoms={symptoms} />
    </>
  );
}
