import { CaseData } from '../types/case';

export const mockCases: CaseData[] = [
  {
    id: 'EDU004',
    title: 'Educational Access Discrimination',
    description: 'Complaint about discriminatory admission practices at public senior high school. The complainant alleges that their child was denied admission based on discriminatory criteria that violate constitutional rights to education. Multiple students from similar backgrounds have reported similar treatment, suggesting a pattern of systematic discrimination in the admission process.',
    complainant: 'Parent Teachers Association',
    investigation_notes: "",
    respondent: 'Ghana Education Service',
    dateSubmitted: '8/12/2024',
    status: "investigation",
    documents: [
      'Admission_Denial_Letter.pdf',
      'Student_Application_Form.pdf',
      'Witness_Statements.pdf',
      'School_Admission_Policy.pdf'
    ],
    additionalDetails: {
      location: 'Accra Senior High School, Greater Accra Region',
    },
    docRequests: [],
    hearings: [],
    mediation: {
      date: "",
      time: "",
      venue: "",
      purpose: "",
      respondent_attending: null,
      complainant_attending: null
    },
    terms: [],
    resolved_positively: null,
    final_notes: null
  },
  {
    id: 'EMP012',
    title: 'Workplace Discrimination Case',
    description: 'Employee alleges discrimination based on gender in promotion decisions. The complainant has documented multiple instances where less qualified male colleagues received promotions over more qualified female employees.',
    complainant: 'Ms. Jane Doe',
    investigation_notes: "",
    respondent: 'ABC Corporation Ltd',
    dateSubmitted: '10/12/2024',
    status: "hearing",
    documents: [
      'Employment_Records.pdf',
      'Performance_Reviews.pdf'
    ],
    additionalDetails: {
      location: 'Kumasi, Ashanti Region',
    },
    docRequests: [],
    hearings: [],
    mediation: {
      date: "",
      time: "",
      venue: "",
      purpose: "",
      respondent_attending: null,
      complainant_attending: null
    },
    terms: [],
    resolved_positively: null,
    final_notes: null
  },
  {
    id: 'PUB007',
    title: 'Public Service Misconduct',
    description: 'Allegation of abuse of office and corruption by public officials in the procurement process. Documents suggest irregularities in contract awarding procedures.',
    complainant: 'Civil Society Organization',
    investigation_notes: "",
    respondent: 'Ministry of Local Government',
    dateSubmitted: '12/12/2024',
    status: "hearing",
    documents: [
      'Procurement_Documents.pdf',
      'Audit_Report.pdf',
      'Correspondence.pdf'
    ],
    additionalDetails: {
      location: 'Tamale, Northern Region',
    },
    docRequests: [],
    hearings: [],
    mediation: {
      date: "",
      time: "",
      venue: "",
      purpose: "",
      respondent_attending: null,
      complainant_attending: null
    },
    terms: [],
    resolved_positively: null,
    final_notes: null
  }
];