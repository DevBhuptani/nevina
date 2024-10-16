import Calendar from './components/CalendarComponent';
import CalendarScheduleComponent from './components/CalendarScheduleComponent';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex p-4 w-full">
        <Calendar />
        <CalendarScheduleComponent />
      </div>
      <Footer />
    </div>
  );
}

export default App;
