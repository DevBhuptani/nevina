import { useState } from 'react';
import {
  Home,
  User,
  Book,
  Music,
  Calendar,
  Trophy,
  ChevronDown,
  ChevronUp,
  Tag,
  Users,
  BarChart,
  Music2Icon,
  PanelRightClose,
  PanelLeftClose,
} from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [collectionOpen, setCollectionOpen] = useState<boolean>(false);
  const [stationsOpen, setStationsOpen] = useState<boolean>(false);
  const [performanceOpen, setPerformanceOpen] = useState<boolean>(false);

  return (
    <div
      className={`bg-white h-screen ${
        isOpen ? 'w-64' : 'w-16'
      } transition-width duration-300 overflow-hidden ${
        isOpen ? 'block' : 'hidden'
      } lg:block`}
    >
      <div className="flex justify-between items-center p-4">
        <button
          className="text-gray-600 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <PanelLeftClose /> : <PanelRightClose />}
        </button>
      </div>
      <ul className="space-y-2">
        <li className="flex items-center p-4 hover:bg-gray-100">
          <Home className="text-gray-600" />
          {isOpen && <span className="ml-4">Home</span>}
        </li>
        <li className="flex items-center p-4 hover:bg-gray-100">
          <User className="text-gray-600" />
          {isOpen && <span className="ml-4">Profile</span>}
        </li>
        <li className="flex items-center p-4 hover:bg-gray-100">
          <Book className="text-gray-600" />
          {isOpen && <span className="ml-4">Library</span>}
        </li>

        <li
          className="p-4 hover:bg-gray-100 cursor-pointer"
          onClick={() => setCollectionOpen(!collectionOpen)}
        >
          <div className="flex items-center">
            <Music className="text-gray-600" />
            {isOpen && (
              <span className="ml-4 flex items-center">
                Collection {collectionOpen ? <ChevronUp /> : <ChevronDown />}
              </span>
            )}
          </div>
        </li>
        {isOpen && collectionOpen && (
          <ul className="ml-8 space-y-2">
            <li className="flex items-center text-gray-600 hover:text-black">
              <Music2Icon className="mr-2 w-5 h-5" />
              Playlists
            </li>
            <li className="flex items-center text-gray-600 hover:text-black">
              <Music2Icon className="mr-2 w-5 h-5" />
              Tracks
            </li>
            <li className="flex items-center text-gray-600 hover:text-black">
              <User className="mr-2 w-5 h-5" />
              Artists
            </li>
            <li className="flex items-center text-gray-600 hover:text-black">
              <Book className="mr-2 w-5 h-5" />
              Albums
            </li>
            <li className="flex items-center text-gray-600 hover:text-black">
              <Tag className="mr-2 w-5 h-5" />
              Genres
            </li>
            <li className="flex items-center text-gray-600 hover:text-black">
              <Tag className="mr-2 w-5 h-5" />
              Decades
            </li>
            <li className="flex items-center text-gray-600 hover:text-black">
              <Tag className="mr-2 w-5 h-5" />
              Geos
            </li>
          </ul>
        )}

        <li className="flex items-center p-4 hover:bg-gray-100">
          <Calendar className="text-gray-600" />
          {isOpen && <span className="ml-4">Community</span>}
        </li>

        <li
          className="p-4 hover:bg-gray-100 cursor-pointer"
          onClick={() => setStationsOpen(!stationsOpen)}
        >
          <div className="flex items-center">
            <Music className="text-gray-600" />
            {isOpen && (
              <span className="ml-4 flex items-center">
                Stations {stationsOpen ? <ChevronUp /> : <ChevronDown />}
              </span>
            )}
          </div>
        </li>
        {isOpen && stationsOpen && (
          <ul className="ml-8 space-y-2">
            <li className="flex items-center text-gray-600 hover:text-black">
              <Calendar className="mr-2 w-5 h-5" />
              Scheduled listening
            </li>
            <li className="flex items-center text-gray-600 hover:text-black">
              <Music2Icon className="mr-2 w-5 h-5" />
              Music discovery
            </li>
            <li className="flex items-center text-gray-600 hover:text-black">
              <Users className="mr-2 w-5 h-5" />
              Positive music
            </li>
            <li className="flex items-center text-gray-600 hover:text-black">
              <BarChart className="mr-2 w-5 h-5" />
              Mood regulation
            </li>
          </ul>
        )}

        <li
          className="p-4 hover:bg-gray-100 cursor-pointer"
          onClick={() => setPerformanceOpen(!performanceOpen)}
        >
          <div className="flex items-center">
            <Trophy className="text-gray-600" />
            {isOpen && (
              <span className="ml-4 flex items-center">
                Performance {performanceOpen ? <ChevronUp /> : <ChevronDown />}
              </span>
            )}
          </div>
        </li>
        {isOpen && performanceOpen && (
          <ul className="ml-8 space-y-2">
            <li className="flex items-center text-gray-600 hover:text-black">
              <Calendar className="mr-2 w-5 h-5" />
              Calendar
            </li>
            <li className="flex items-center text-gray-600 hover:text-black">
              <Users className="mr-2 w-5 h-5" />
              Groups
            </li>
            <li className="flex items-center text-gray-600 hover:text-black">
              <BarChart className="mr-2 w-5 h-5" />
              Music Analysis
            </li>
          </ul>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
