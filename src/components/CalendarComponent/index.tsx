import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('day');
  const [events, setEvents] = useState([
    { id: 1, title: 'Jai Shree raam', time: '2024-10-17T08:15', duration: 15 },
    { id: 2, title: 'Radha 2023', time: '2024-10-17T09:30', duration: 30 },
    { id: 3, title: 'B Prank', time: '2024-10-18T10:00', duration: 15 },
    { id: 4, title: 'Arlene mccoy track', time: '2024-10-18T11:15', duration: 45 },
    { id: 5, title: 'Office chill track', time: '2024-10-19T08:45', duration: 60 },
    { id: 6, title: 'Jacob Jones', time: '2024-10-19T09:45', duration: 30 },
    { id: 7, title: 'Kristin Watson', time: '2024-10-19T10:15', duration: 45 },
    { id: 8, title: 'Esther Track', time: '2024-10-20T11:00', duration: 30 },
    { id: 9, title: 'Chloe McKinney Hits', time: '2024-10-20T12:30', duration: 45 },
  ]);
  
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', time: '', duration: 15 });

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const navigateDay = (direction: number) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + direction);
      return newDate;
    });
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const eventToAdd = {
      id: events.length + 1,
      time: newEvent.time,
      title: newEvent.title,
      duration: newEvent.duration,
    };
    setEvents([...events, eventToAdd]);
    setNewEvent({ title: '', time: '', duration: 15 });
    setShowEventForm(false);
  };

  const renderMonthView = () => {
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-2 border border-gray-200"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const formattedDate = date.toISOString().split('T')[0]; // Format date to match the event time format (YYYY-MM-DD)

      const dayEvents = events.filter(event => event.time.startsWith(formattedDate)); // Filter events by date

      days.push(
        <div key={day} className="p-1 sm:p-2 border border-gray-200">
          <span className="font-bold text-sm sm:text-base">{day}</span>
          {dayEvents.map(event => (
            <div key={event.id} className="text-xs sm:text-sm bg-blue-100 p-1 mt-1 rounded">
              {event.title} ({event.time.split('T')[1].slice(0, 5)})
            </div>
          ))}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="container mx-auto p-2 sm:p-4 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex justify-between items-center p-2 sm:p-4 border-b">
        <div className="flex items-center space-x-2">
          <button onClick={() => navigateDay(-1)} className="p-1 rounded-full hover:bg-gray-200">
            <ChevronLeft size={20} />
          </button>
          <span className="text-sm sm:text-lg font-semibold">
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </span>
          <button onClick={() => navigateDay(1)} className="p-1 rounded-full hover:bg-gray-200">
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="flex space-x-1 sm:space-x-2">
          <button
            onClick={() => setView('day')}
            className={`px-2 sm:px-3 py-1 rounded-md ${view === 'day' ? 'bg-yellow-400 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Day
          </button>
          <button
            onClick={() => setView('week')}
            className={`px-2 sm:px-3 py-1 rounded-md ${view === 'week' ? 'bg-yellow-400 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Week
          </button>
          <button
            onClick={() => setView('month')}
            className={`px-2 sm:px-3 py-1 rounded-md ${view === 'month' ? 'bg-yellow-400 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Month
          </button>
        </div>

        <button
          onClick={() => setShowEventForm(true)}
          className="px-2 sm:px-4 py-1 sm:py-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 flex items-center"
        >
          <Plus size={20} className="mr-1" /> Schedule Session
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2 h-[600px] sm:h-[600px] overflow-y-auto">
        {renderMonthView()}
      </div>

      {showEventForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg w-11/12 sm:w-3/4 lg:w-1/2">
            <h2 className="text-xl font-bold mb-4">Schedule Session</h2>
            <form onSubmit={handleAddEvent} className="space-y-4">
              <input
                type="text"
                placeholder="Session Title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="datetime-local"
                value={newEvent.time}
                onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="number"
                placeholder="Duration (minutes)"
                value={newEvent.duration}
                onChange={(e) => setNewEvent({ ...newEvent, duration: parseInt(e.target.value) })}
                className="w-full p-2 border rounded"
                required
              />
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={() => setShowEventForm(false)} className="px-4 py-2 bg-gray-300 rounded">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-yellow-400 text-white rounded">
                  Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
