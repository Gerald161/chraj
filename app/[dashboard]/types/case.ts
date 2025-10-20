export interface Hearing{
  id: string;
  date: string;
  time: string;
  venue: string;
  attendees: string[];
  purpose: string;
  itemsForRespondent?: string[];
  itemsForComplainant?: string[];
  respondent_attending?: null | boolean;
  complainant_attending?: null | boolean;
}

export interface MediationHearing{
  date: string;
  time: string;
  venue: string;
  purpose: string;
  respondent_attending?: null | boolean;
  complainant_attending?: null | boolean;
}

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
  hearings: Hearing[];
  mediation: MediationHearing;
  terms: string[];
  resolved_positively?: null | boolean;
  final_notes?: string | null;
};

export interface Appointment {
  appointment_id: string;
  type: 'hearing' | 'mediation';
  purpose: string;
  date: string;
  time: string;
  venue: string;
  case_id: string;
  complainant: string;
  respondent: string;
}