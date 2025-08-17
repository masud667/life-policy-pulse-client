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
  HiX,
  HiNewspaper,
  HiClipboardCheck,
  HiCash,
  HiCollection
} from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = ({ role }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // Navigation items with corrected icons
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
      icon: <HiNewspaper className="h-5 w-5" />,
      visible: role === "agent" 
    },
    { 
      path: "/dashboard/user/payment-status", 
      label: "Payment Status", 
      icon: <HiCash className="h-5 w-5" />,
      visible: role === "user" 
    },
    { 
      path: "/dashboard/user/claim-request", 
      label: "Claim Request", 
      icon: <HiClipboardCheck className="h-5 w-5" />,
      visible: role === "user" 
    },
    { 
      path: "/dashboard/agent/policy-claims", 
      label: "Policy Claims", 
      icon: <HiShieldCheck className="h-5 w-5" />,
      visible: role === "agent" 
    },
    // Admin specific items
    { 
      path: "/dashboard/admin/manage-applications", 
      label: "Manage Applications", 
      icon: <HiCollection className="h-5 w-5" />,
      visible: role === "admin" 
    },
    { 
      path: "/dashboard/admin/manage-users", 
      label: "Manage Users", 
      icon: <HiUserGroup className="h-5 w-5" />,
      visible: role === "admin" 
    },
    { 
      path: "/dashboard/admin/manage-policies", 
      label: "Manage Policies", 
      icon: <HiDocumentText className="h-5 w-5" />,
      visible: role === "admin" 
    },
    // { 
    //   path: "/dashboard/admin/manage-transactions", 
    //   label: "Manage Transactions", 
    //   icon: <HiCurrencyDollar className="h-5 w-5" />,
    //   visible: role === "admin" 
    // }
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="fixed top-20 left-4 z-50 lg:hidden border border-blue-600 text-black p-2 rounded-md shadow-lg"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <HiX className="h-5 w-5" /> : <HiMenu className="h-5 w-5" />}
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed top-0 left-0 w-64 h-screen p-4 bg-gradient-to-b from-blue-600 via-indigo-600 to-purple-900 shadow-2xl pt-26">

        {/* Navigation Items */}
        <ul className="space-y-1">
          {navItems.map((item) => 
            item.visible && (
              <motion.li 
                key={item.path}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link 
                  to={item.path}
                  className="flex items-center p-3 text-gray-200 rounded-lg hover:bg-indigo-700/80 transition-all duration-200 hover:text-white group"
                >
                  <div className="bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-500 transition-colors">
                    {item.icon}
                  </div>
                  <span className="ml-3 font-medium">{item.label}</span>
                </Link>
              </motion.li>
            )
          )}
        </ul>
      </aside>

      {/* Mobile Sidebar with Animation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed z-40 w-64 min-h-screen p-4 bg-gradient-to-b from-blue-600 via-indigo-600 to-purple-900 shadow-2xl lg:hidden pt-26"
          >
           
            {/* Navigation Items */}
            <ul className="space-y-1">
              {navItems.map((item) => 
                item.visible && (
                  <motion.li 
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Link 
                      to={item.path}
                      className="flex items-center p-3 text-gray-200 rounded-lg hover:bg-indigo-700/80 transition-all duration-200 hover:text-white group"
                      onClick={() => setMobileOpen(false)}
                    >
                      <div className="bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-500 transition-colors">
                        {item.icon}
                      </div>
                      <span className="ml-3 font-medium">{item.label}</span>
                    </Link>
                  </motion.li>
                )
              )}
            </ul>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;