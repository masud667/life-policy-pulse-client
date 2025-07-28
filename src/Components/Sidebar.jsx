import { Link } from "react-router";

const Sidebar = ({ role }) => {
  return (
    <aside className="w-64 bg-gradient-to-b from-blue-600 to-purple-600 min-h-screen p-6 shadow-xl">
      <div className="mb-10 pt-4">
        <h1 className="text-2xl font-bold text-white tracking-wide">
          LifePolicy<span className="text-cyan-400">Pulse</span>
        </h1>
        <div className="w-16 h-1 bg-cyan-400 mt-2 rounded-full"></div>
      </div>

      <ul className="space-y-3">
        <li className="group">
          <Link 
            to="/dashboard" 
            className="flex items-center gap-3 px-4 py-3 text-gray-200 rounded-lg group-hover:bg-indigo-700 transition-all duration-300 hover:text-white"
          >
            <div className="bg-indigo-600 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
            <span className="font-medium">Dashboard</span>
          </Link>
        </li>

        {role === "user" && (
          <PanelLink 
            to="/dashboard/user" 
            text="User Panel"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            }
          />
        )}

        {role === "admin" && (
          <PanelLink 
            to="/dashboard/admin" 
            text="Admin Panel"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            }
          />
        )}

        {role === "agent" && (
          <PanelLink 
            to="/dashboard/agent" 
            text="Agent Panel"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
            }
          />
        )}
      </ul>
    </aside>
  );
};

// Reusable panel link component
const PanelLink = ({ to, text, icon }) => (
  <li className="group">
    <Link 
      to={to} 
      className="flex items-center gap-3 px-4 py-3 text-gray-200 rounded-lg group-hover:bg-purple-700/80 transition-all duration-300 hover:text-white"
    >
      <div className="bg-purple-600 p-2 rounded-lg">
        {icon}
      </div>
      <span className="font-medium">{text}</span>
    </Link>
  </li>
);

export default Sidebar;