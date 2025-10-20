import { Appointment } from "../types/case";

export const mockAppointments: Appointment[] = [
  {
    appointment_id: '1',
    purpose: 'Police Misconduct Investigation',
    type: 'hearing',
    date: '2025-01-15',
    time: '09:30',
    venue: 'CHRAJ Regional Office, Hearing Room A',
    case_id: 'PMI/2024/0125',
    complainant: 'John Doe',
    respondent: 'Ghana Police Service'
  },
  {
    appointment_id: '2',
    purpose: 'Employment Discrimination Case',
    type: 'mediation',
    date: '2025-01-14',
    time: '14:00',
    venue: 'CHRAJ Regional Office, Mediation Room B',
    case_id: 'EDC/2024/0089',
    complainant: 'Mary Johnson',
    respondent: 'XYZ Corporation'
  },
  {
    appointment_id: '3',
    purpose: 'Land Dispute Resolution',
    type: 'hearing',
    date: '2025-01-12',
    time: '10:00',
    venue: 'CHRAJ Regional Office, Hearing Room C',
    case_id: 'LDR/2024/0045',
    complainant: 'Community Leaders',
    respondent: 'Local Authority'
  },
  {
    appointment_id: '4',
    purpose: 'Government Service Complaint',
    type: 'mediation',
    date: '2025-01-18',
    time: '11:15',
    venue: 'CHRAJ Regional Office, Mediation Room A',
    case_id: 'GSC/2024/0156',
    complainant: 'Citizens Group',
    respondent: 'Municipal Assembly'
  }
];