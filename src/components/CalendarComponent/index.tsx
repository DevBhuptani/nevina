import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month');
  const [events, setEvents] = useState([
    { id: 1, title: 'Jai Shree Raam', time: '08:15', duration: 15, date: '2024-10-15' },
    { id: 2, title: 'Radha 2023', time: '09:30', duration: 30, date: '2024-10-20' },
    { id: 3, title: 'B Prank', time: '10:00', duration: 15, date: '2024-10-10' },
    { id: 4, title: 'Arlene McCoy Track', time: '11:15', duration: 45, date: '2024-10-05' },
    { id: 5, title: 'Office Chill Track', time: '08:45', duration: 60, date: '2024-10-07' },
    { id: 6, title: 'Jacob Jones', time: '09:45', duration: 30, date: '2024-10-25' },
    { id: 7, title: 'Kristin Watson', time: '10:15', duration: 45, date: '2024-10-22' },
    { id: 8, title: 'Esther Track', time: '11:00', duration: 30, date: '2024-10-18' },
    { id: 9, title: 'Chloe McKinney Hits', time: '12:30', duration: 45, date: '2024-10-28' },
  ]);
  
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', time: '', duration: 15, date: '' });

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  // Function to navigate the calendar days
  const navigateMonth = (direction: number) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + direction);
      return newDate;
    });
  };

  // Function to handle event form submission
  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const eventToAdd = {
      id: events.length + 1,
      ...newEvent
    };
    setEvents([...events, eventToAdd]);
    setNewEvent({ title: '', time: '', duration: 15, date: '' });
    setShowEventForm(false);
  };

  // Render month view
  const renderMonthView = () => {
    const days = [];

    // Empty spaces for days of previous month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-2 border border-gray-200"></div>);
    }

    // Display each day with its events
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      const dayEvents = events.filter(event => event.date === dateString);

      days.push(
        <div key={day} className="p-2 border border-gray-200 relative">
          <span className="font-bold">{day}</span>
          {dayEvents.map(event => (
            <div key={event.id} className="text-xs bg-blue-100 p-1 mt-1 rounded">
              {event.title} ({event.time})
            </div>
          ))}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b">
        {/* Navigation buttons */}
        <div className="flex items-center space-x-2">
          <button onClick={() => navigateMonth(-1)} className="p-1 rounded-full hover:bg-gray-200">
            <ChevronLeft size={20} />
          </button>
          <span className="text-lg font-semibold">
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </span>
          <button onClick={() => navigateMonth(1)} className="p-1 rounded-full hover:bg-gray-200">
            <ChevronRight size={20} />
          </button>
        </div>

        {/* View selection buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => setView('day')}
            className={`px-3 py-1 rounded-md ${view === 'day' ? 'bg-yellow-400 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Day
          </button>
          <button
            onClick={() => setView('week')}
            className={`px-3 py-1 rounded-md ${view === 'week' ? 'bg-yellow-400 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Week
          </button>
          <button
            onClick={() => setView('month')}
            className={`px-3 py-1 rounded-md ${view === 'month' ? 'bg-yellow-400 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Month
          </button>
        </div>

        {/* Schedule session button */}
        <button
          onClick={() => setShowEventForm(true)}
          className="px-4 py-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 flex items-center"
        >
          <Plus size={20} className="mr-1" /> Schedule Session
        </button>
      </div>

      {/* Calendar month view */}
      <div className="grid grid-cols-7 gap-2 h-[600px] overflow-y-auto">
        {renderMonthView()}
      </div>

      {/* Add Event Form */}
      {showEventForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
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
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="time"
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
