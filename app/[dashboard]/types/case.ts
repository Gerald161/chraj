export interface CaseData {
  id: string;
  title: string;
  description: string;
  complainant: string;
  respondent?: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'INITIAL_REVIEW' | 'INVESTIGATION' | 'HEARING' | 'MEDIATION' | 'DECISION' | 'RESOLVED';
  dateCreated: string;
  lastUpdated: string;
  progress: number;
  documents: Document[];
  notes: string[];
  assignedOfficer: string;
  caseNumber: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  url: string;
}

export interface CaseAction {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  officer: string;
}