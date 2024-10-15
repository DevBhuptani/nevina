/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const CalendarLayout = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const events = [
    { id: 1, title: 'Jai Shree raam', time: '08:00', duration: 60 },
    { id: 2, title: 'Radha 2023', time: '09:30', duration: 30 },
    { id: 3, title: 'B Prank', time: '10:00', duration: 15 },
    { id: 4, title: 'Arlene mccoy track', time: '11:00', duration: 60 },
    { id: 5, title: 'Office chill track', time: '09:00', duration: 90 },
    { id: 6, title: 'Jacob Jones', time: '10:00', duration: 30 },
    { id: 7, title: 'Kristin Watson', time: '10:30', duration: 45 },
    { id: 8, title: 'Esther Track', time: '11:00', duration: 30 },
    { id: 9, title: 'Chloe Mckinney Hits', time: '12:30', duration: 45 },
  ];

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const changeDate = (days: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  const getEventStyle = (event: { id?: number; title?: string; time: any; duration: any; }) => {
    const startHour = parseInt(event.time.split(':')[0]);
    const startMinute = parseInt(event.time.split(':')[1]);
    const top = (startHour * 60 + startMinute) / 15;
    const height = event.duration / 15;
    return { top: `${top}px`, height: `${height}px` };
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4 w-[75%]">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => changeDate(-1)}
            className="p-1 rounded-full hover:bg-gray-200"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="font-semibold">{formatDate(currentDate)}</span>
          <button
            onClick={() => changeDate(1)}
            className="p-1 rounded-full hover:bg-gray-200"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-gray-200 rounded-md text-sm">
            Day
          </button>
          <button className="px-3 py-1 bg-white rounded-md text-sm">
            Week
          </button>
          <button className="px-3 py-1 bg-white rounded-md text-sm">
            Month
          </button>
        </div>
        <button className="flex items-center space-x-1 bg-yellow-400 text-white px-3 py-1 rounded-md">
          <Plus size={16} />
          <span className="text-sm">Schedule session</span>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="relative bg-white rounded-lg shadow">
          {hours.map((hour) => (
            <div key={hour} className="flex border-t border-gray-200">
              <div className="w-16 py-2 text-right pr-2 text-xs text-gray-500">
                {hour.toString().padStart(2, '0')}:00
              </div>
              <div className="flex-1 h-15 relative"></div>
            </div>
          ))}
          {events.map((event) => (
            <div
              key={event.id}
              className="absolute left-16 right-0 bg-blue-100 border-l-4 border-blue-500 p-1 text-xs overflow-hidden"
              style={getEventStyle(event)}
            >
              {event.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarLayout;
