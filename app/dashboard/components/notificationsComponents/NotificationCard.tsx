import { Calendar, User } from 'lucide-react';

export type NotificationType = 'hearing' | 'mediation';
export type UserRole = 'complainant' | 'respondent';

export interface NotificationData {
  id: string;
  type: NotificationType;
  userRole: UserRole;
  userName: string;
  caseNumber: string;
  currentDateTime: string;
  proposedDateTime: string;
  reason?: string;
  timestamp: Date;
  isRead: boolean;
}

interface NotificationCardProps {
  notification: NotificationData;
  isDarkMode: boolean;
  onClick?: (id: string) => void;
}

export function NotificationCard({
  notification,
  isDarkMode,
  onClick,
}: NotificationCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  };

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  const handleCardClick = () => {
    onClick?.(notification.id);
  };

  return (
    <div
      className={`
        rounded-lg border transition-all duration-200 cursor-pointer relative
        ${
          notification.isRead
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
      {!notification.isRead && (
        <div className="absolute top-4 right-4 w-2 h-2 bg-blue-600 rounded-full" />
      )}

      <div className="p-4 pr-8">
        <div className="flex items-start gap-3">
          <div
            className={`
              p-2 rounded-lg flex-shrink-0
              ${
                notification.isRead
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
                notification.isRead
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
                {notification.userName}
                <span className={`ml-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  ({notification.userRole})
                </span>
              </span>
            </div>

            <div className={`flex items-center gap-2 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <span>{formatDate(notification.timestamp)}</span>
              <span>•</span>
              <span>{getTimeAgo(notification.timestamp)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}