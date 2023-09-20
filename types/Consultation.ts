interface DiseaseSolution {
  name: string;
  description: string;
}

interface Disease {
  name: string;
  percentage: number;
  description: string;
  solutions: DiseaseSolution[];
}

interface Symptom {
  name: string;
  code: string;
  dsValue: number;
}

interface Consultation {
  id: number;
  invoice: string;
  patientName: string;
  invoiceDate: string;
  dieses: Disease[];
  symptoms: Symptom[];
}

export default Consultation;
