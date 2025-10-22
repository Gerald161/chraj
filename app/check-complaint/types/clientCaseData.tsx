export interface ClientCaseData {
    id: string;
    case_officer: string;
    status: string;
    title: string;
    description: string;
    dateSubmitted: string;
    complainant: string;
    respondent: string;
    case_files: string[];
    requested_documents: string[];
    hearing_appointment_documents: string[];
    terms: string[];
    your_hearing_appointment: {
        id: number;
        date: string;
        time: string;
        venue: string;
        purpose: string;
        respondent_attending: boolean;
        complainant_attending: boolean;
        requested_reschedule: {
            date: string,
            time: string
        }
    } | null;
    view_type: string;
    mandate_decision: boolean | null;
    your_mediation_appointment: {
        id: number;
        date: string;
        time: string;
        venue: string;
        purpose: string;
        respondent_attending: boolean;
        complainant_attending: boolean;
        requested_reschedule: {
            date: string,
            time: string
        }
    } | null;
}