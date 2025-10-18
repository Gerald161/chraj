export interface CaseData {
  id: string;
  title: string;
  description: string;
  complainant: string;
  investigation_notes: string;
  respondent: string;
  dateSubmitted: string;
  status: string;
  documents?: string[];
  additionalDetails?: {
    location?: string;
  };
  docRequests: string[];
};