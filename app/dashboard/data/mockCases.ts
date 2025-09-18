import { CaseData } from '../types/case';

export const mockCases: CaseData[] = [
  {
    id: '1',
    title: 'Police Misconduct Investigation',
    description: 'Complaint regarding excessive force used during arrest at Tema Station. Multiple witnesses present.',
    complainant: 'Mary Asante',
    respondent: 'Ghana Police Service - Tema Division',
    priority: 'HIGH',
    status: 'HEARING',
    dateCreated: '2024-08-10',
    lastUpdated: '2024-08-12',
    progress: 60,
    documents: [
      {
        id: '1',
        name: 'Witness Statement 1.pdf',
        type: 'application/pdf',
        uploadDate: '2024-08-11',
        url: '#'
      }
    ],
    notes: [
      'Initial complaint filed online',
      'Preliminary review completed - case within mandate',
      'Investigation commenced - requesting additional evidence'
    ],
    assignedOfficer: 'Officer John Doe',
    caseNumber: 'CHR002'
  },
  {
    id: '2',
    title: 'Municipal Revenue Misappropriation',
    description: 'Allegation of misuse of internally generated funds by Accra Metropolitan Assembly officials.',
    complainant: 'Citizens Coalition',
    respondent: 'Accra Metropolitan Assembly',
    priority: 'HIGH',
    status: 'MEDIATION',
    dateCreated: '2024-08-08',
    lastUpdated: '2024-08-11',
    progress: 80,
    documents: [
      {
        id: '2',
        name: 'Financial Records.xlsx',
        type: 'application/vnd.ms-excel',
        uploadDate: '2024-08-09',
        url: '#'
      }
    ],
    notes: [
      'Complex financial misappropriation case',
      'Investigation completed with substantial evidence',
      'Mediation scheduled for August 15th'
    ],
    assignedOfficer: 'Officer Jane Smith',
    caseNumber: 'COR001'
  },
  {
    id: '3',
    title: 'Land Title Registration Delays',
    description: 'Systematic delays in land title registration process affecting multiple applicants.',
    complainant: 'Multiple Landowners Association',
    respondent: 'Lands Commission',
    priority: 'LOW',
    status: 'RESOLVED',
    dateCreated: '2024-07-15',
    lastUpdated: '2024-08-01',
    progress: 100,
    documents: [],
    notes: [
      'Case resolved through administrative directive',
      'Improved processing timeline implemented'
    ],
    assignedOfficer: 'Officer Michael Owusu',
    caseNumber: 'LND003'
  },
  {
    id: '4',
    title: 'Educational Access Discrimination',
    description: 'Complaint about discriminatory admission practices at public senior high school.',
    complainant: 'Parent Teachers Association',
    respondent: 'Ghana Education Service',
    priority: 'MEDIUM',
    status: 'INITIAL_REVIEW',
    dateCreated: '2024-08-12',
    lastUpdated: '2024-08-12',
    progress: 15,
    documents: [],
    notes: [
      'Case recently submitted',
      'Awaiting initial review by assigned officer'
    ],
    assignedOfficer: 'Officer Sarah Mensah',
    caseNumber: 'EDU004'
  }
];