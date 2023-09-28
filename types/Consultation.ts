export interface Solution {
  name: string;
  description: string;
}

export interface Disease {
  code: string;
  name: string;
  description: string;
  solutions: Solution[];
}

interface Result {
  dieses: Disease[];
  percentage: number;
}

interface Symptom {
  name: string;
  code: string;
  dsValue: number;
}

interface Known {
  diese: string;
  belief: string;
}

interface ReportData {
  dieses: string[] | null;
  value: string | null;
}

interface Report {
  name: string;
  calculationData: ReportData[][];
  knowns: Known[];
  mcombinationList: string[];
}

interface Consultation {
  id: number;
  invoice: string;
  patientName: string;
  invoiceDate: string;
  results: Result[];
  symptoms: Symptom[];
  report: Report;
}

export default Consultation;
