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

interface InvoiceData {
  id: number;
  invoice: string;
  patientName: string;
  invoiceDate: string;
  dieses: Disease[];
  symtoms: Symptom[];
}
export default InvoiceData;
