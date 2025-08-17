import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../Context/AuthContext';
import Logo from './Logo';
import AuthSecureAxios from '../Hooks/AuthSecureAxios';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showProfile, setShowProfile] = useState(true);
  const { user, logOut } = useContext(AuthContext);
 const navigate = useNavigate()

const handleLogout = async () => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "Do you really want to logout?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, logout!",
  });

  if (result.isConfirmed) {
    try {
      await logOut();
      await AuthSecureAxios.post("/logout"); 
      Swal.fire("Logged Out", "You have been logged out successfully", "success");

      navigate("/login");
      
    } catch (error) {
      console.error("Logout error:", error);
      Swal.fire("Error", error.message, "error");
    }
  }
};

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-xl ">
      <div className="w-11/12 mx-auto">
        <div className="flex justify-between h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-white rounded-full p-1.5">
                <Logo></Logo>
              </div>
              <span className="text-white font-bold text-2xl tracking-tighter">
                LifePolicy<span className="text-amber-300">Pulse</span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/policies">All Policies</NavLink>
            <NavLink to="/blog">Blog</NavLink>
            {user && <NavLink to="/dashboard">Dashboard</NavLink>}
          </div>

          {/* Auth Section - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
                <Link to="/login" className="text-white font-medium hover:text-amber-200 transition-colors px-4 py-2 border-2 border-amber-300 rounded-full">
                  Login
                </Link>
                <Link to="/register" className="bg-amber-400 hover:bg-amber-300 text-indigo-900 font-bold px-5 py-2.5 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Register
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-6">
               <Link to={'/profile'} className="flex items-center space-x-2 group">
  {user?.photoURL ? (
    <img
      src={user.photoURL}
      alt="Profile"
      className="w-10 h-10 rounded-full border-2 border-white"
    />
  ) : (
    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
  )}
  <span className="text-white font-medium group-hover:text-amber-200 transition-colors">
    My Profile
  </span> 
</Link>


                <button onClick={handleLogout} className="text-white font-medium hover:text-red-300 transition-colors flex items-center space-x-1">
                  <span>Logout</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white hover:text-amber-200 focus:outline-none">
              {isMenuOpen ? (
                <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-indigo-700 shadow-inner">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</MobileNavLink>
            <MobileNavLink to="/policies" onClick={() => setIsMenuOpen(false)}>All Policies</MobileNavLink>
            <MobileNavLink to="/blog" onClick={() => setIsMenuOpen(false)}>Blog</MobileNavLink>
            {user && <MobileNavLink to="/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</MobileNavLink>}
          </div>
          <div className="pt-4 pb-6 border-t border-indigo-500 px-4">
            {!user ? (
              <div className="flex space-x-4">
                <Link to="/login" className="w-full py-3 px-4 text-center text-white font-medium bg-indigo-800 hover:bg-indigo-700 rounded-lg transition-colors">
                  Login
                </Link>
                <Link to="/register" className="w-full py-3 px-4 text-center font-bold bg-amber-400 hover:bg-amber-300 text-indigo-900 rounded-lg transition-colors">
                  Register
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-3 p-3 rounded-lg bg-indigo-800 hover:bg-indigo-700">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                  <span className="text-white font-medium">My Profile</span>
                </Link>
                <button onClick={handleLogout} className="w-full flex justify-center items-center space-x-2 py-3 px-4 text-white font-medium bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-lg transition-all">
                  <span>Logout</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

// Reusable NavLink Component
const NavLink = ({ to, children }) => (
  <Link to={to} className="text-white font-medium hover:text-amber-200 transition-colors px-3 py-2 relative group">
    {children}
    <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 w-0 bg-amber-400 transition-all duration-300 group-hover:w-4/5"></span>
  </Link>
);

// Reusable Mobile NavLink Component
const MobileNavLink = ({ to, children, onClick }) => (
  <Link to={to} onClick={onClick} className="text-white block px-4 py-3 text-lg font-medium rounded-lg hover:bg-indigo-600 transition-colors">
    {children}
  </Link>
);

export default Navbar;
