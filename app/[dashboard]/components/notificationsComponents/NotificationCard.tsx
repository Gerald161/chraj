import { Calendar, User } from 'lucide-react';
import { Appointment } from '../../types/case';

export type UserRole = 'complainant' | 'respondent';

export interface NotificationData {
  notification_id: string;
  requester: UserRole;
  new_date: string;
  new_time: string;
  is_read: boolean;
  type: string;
  user_name: string;
  appointment: {
    appointment_id: string;
    type: string;
    purpose: string;
    date: string;
    time: string;
    venue: string;
    case_id: string;
    complainant: string;
    respondent: string;
    status: string;
    complainant_attending: boolean;
    respondent_attending: boolean;
    attendee: string;
  };
}

interface NotificationCardProps {
  notification: NotificationData;
  isDarkMode: boolean;
  onClick?: (appointment: Appointment) => void;
}

export function NotificationCard({
  notification,
  isDarkMode,
  onClick,
}: NotificationCardProps) {
  const handleCardClick = () => {
    // onClick?.(notification.notification_id);
  };

  return (
    <div
      className={`
        rounded-lg border transition-all duration-200 cursor-pointer relative
        ${
          notification.is_read
            ? isDarkMode
              ? 'bg-slate-800 border-slate-700'
              : 'bg-white border-gray-200'
            : isDarkMode
            ? 'bg-blue-950/30 border-blue-900'
            : 'bg-blue-50 border-blue-200'
        }
        ${isDarkMode ? 'hover:shadow-slate-900/50' : 'hover:shadow-md'}
      `}
      onClick={handleCardClick}
    >
      {!notification.is_read && (
        <div className="absolute top-4 right-4 w-2 h-2 bg-blue-600 rounded-full" />
      )}

      <div className="p-4 pr-8">
        <div className="flex items-start gap-3">
          <div
            className={`
              p-2 rounded-lg flex-shrink-0
              ${
                notification.is_read
                  ? isDarkMode
                    ? 'bg-slate-700'
                    : 'bg-gray-100'
                  : isDarkMode
                  ? 'bg-blue-900/40'
                  : 'bg-blue-100'
              }
            `}
          >
            <Calendar
              className={`w-5 h-5 ${
                notification.is_read
                  ? isDarkMode
                    ? 'text-gray-400'
                    : 'text-gray-600'
                  : isDarkMode
                  ? 'text-blue-400'
                  : 'text-blue-600'
              }`}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="mb-1">
              <h3 className={`font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                {notification.type === 'hearing' ? 'Hearing' : 'Mediation'} Reschedule
                Request
              </h3>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <User className={`w-4 h-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {notification.user_name}
                <span className={`ml-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  ({notification.requester})
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}