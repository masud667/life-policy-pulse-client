import { useState } from "react";
import { Link } from "react-router";
import { 
  HiHome, 
  HiUser, 
  HiShieldCheck, 
  HiUserGroup, 
  HiDocumentText,
  HiDocument,
  HiCurrencyDollar,
  HiMenu,
  HiX
} from "react-icons/hi";

const Sidebar = ({ role }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // Navigation items configuration
  const navItems = [
    { 
      path: "/dashboard", 
      label: "Dashboard", 
      icon: <HiHome className="h-5 w-5" />,
      visible: true
    },
    { 
      path: "/dashboard/agent/manage-blogs", 
      label: "Manage Blogs", 
      icon: <HiUserGroup className="h-5 w-5" />,
      visible: role === "agent" 
    },
    { 
      path: "/dashboard/user/payment-status", 
      label: "Payment Status", 
      icon: <HiUser className="h-5 w-5" />,
      visible: role === "user" 
    },
   
    
    { 
      path: "/dashboard/agent/policy-claims", 
      label: "Policy Claims", 
      icon: <HiUserGroup className="h-5 w-5" />,
      visible: role === "agent" 
    },
    // Admin specific items
    { 
      path: "/dashboard/admin/manage-applications", 
      label: "Manage Applications", 
      icon: <HiDocumentText className="h-5 w-5" />,
      visible: role === "admin" 
    },
    { 
      path: "/dashboard/admin/manage-users", 
      label: "Manage Users", 
      icon: <HiUser className="h-5 w-5" />,
      visible: role === "admin" 
    },
    { 
      path: "/dashboard/admin/manage-policies", 
      label: "Manage Policies", 
      icon: <HiDocument className="h-5 w-5" />,
      visible: role === "admin" 
    },
    { 
      path: "/dashboard/admin/manage-transactions", 
      label: "Manage Transactions", 
      icon: <HiCurrencyDollar className="h-5 w-5" />,
      visible: role === "admin" 
    }
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="fixed top-20 left-4 z-50 lg:hidden bg-blue-600 text-white p-2 rounded-md shadow-lg"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <aside 
        className={`fixed lg:static z-40 w-64 min-h-screen p-4 bg-gradient-to-b from-blue-600 via-indigo-600 to-purple-900 shadow-2xl transform transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
       

        {/* Navigation Items */}
        <ul className="space-y-1">
          {navItems.map((item) => 
            item.visible && (
              <li key={item.path}>
                <Link 
                  to={item.path}
                  className="flex items-center p-3 text-gray-200 rounded-lg hover:bg-indigo-700/80 transition-all duration-200 hover:text-white group"
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-500 transition-colors">
                    {item.icon}
                  </div>
                  <span className="ml-3 font-medium lg:block hidden">{item.label}</span>
                  {/* Tooltip for mobile view */}
                  <span className="ml-3 font-medium lg:hidden absolute left-16 bg-gray-900 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.label}
                  </span>
                </Link>
              </li>
            )
          )}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;