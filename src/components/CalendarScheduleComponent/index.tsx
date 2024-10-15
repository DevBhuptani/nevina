import { useState } from 'react';
import { ChevronLeft, ChevronRight, Settings } from 'lucide-react';

const CalendarScheduleComponent = () => {
  const currentMonth = 'January 2022';
  
  const [scheduleItems] = useState([
    { name: 'Listen', color: 'bg-gray-200' },
    { name: 'Learn', color: 'bg-red-200' },
    { name: 'Work-Out', color: 'bg-orange-200' },
    { name: 'Study', color: 'bg-green-200' },
    { name: 'Practice', color: 'bg-yellow-200' },
    { name: 'Other', color: 'bg-gray-300' },
  ]);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="max-w-sm mx-auto p-4 bg-white shadow-lg rounded-lg w-[25%]">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">{currentMonth}</h2>
          <div className="flex space-x-2">
            <ChevronLeft className="w-6 h-6 text-gray-500 cursor-pointer" />
            <ChevronRight className="w-6 h-6 text-gray-500 cursor-pointer" />
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-xs font-medium text-gray-500">
              {day}
            </div>
          ))}
          {days.map((day) => (
            <div
              key={day}
              className={`p-1 text-sm ${day === 1 ? 'col-start-7' : ''}`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Schedule</h3>
        <div className="grid grid-cols-4 gap-2">
          {scheduleItems.map((item, index) => (
            <div
              key={index}
              className={`${item.color} rounded-full py-1 px-2 text-xs text-center`}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Music</h3>
          <Settings className="w-5 h-5 text-gray-500" />
        </div>
        <div className="space-y-2">
          {[1, 2].map((_, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm">Ronald rich playlist</span>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-8 h-4 rounded-full ${
                    index === 0 ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white shadow-md transform ${
                      index === 0 ? 'translate-x-4' : ''
                    }`}
                  />
                </div>
                <div className="w-4 h-4 border border-gray-300 rounded-sm" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarScheduleComponent;
