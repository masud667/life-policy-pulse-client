import { FaHeartbeat, FaShieldAlt, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router';
import Logo from '../Logo';

const Footer = () => {
  const links = [
    { name: "Insurance Plans", path: "/policies" },
    { name: "Premium Calculator", path: "/quote" },
    { name: "Apply process", path: "/apply" }
  ];
  return (
    <footer className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
      {/* Wave Decoration */}
      <div className="w-full overflow-hidden">
        <svg 
          viewBox="0 0 1200 120" 
          className="fill-current text-blue-800 w-full h-16"
        >
          <path d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,74.7C1120,75,1280,53,1360,42.7L1440,32L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
        </svg>
      </div>

      {/* Main Footer Content */}
      <div className="w-11/12 mx-auto p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          
          {/* Brand Column */}
          <div>
            <div className="flex items-center mb-4">
             <Logo />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-teal-200 pl-2">
                LifePolicyPulse
              </span>
            </div>
            <p className="text-blue-100 mb-6">
              Your trusted partner for life insurance solutions. We help you find the perfect coverage to protect what matters most.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="bg-blue-700 hover:bg-blue-600 p-3 rounded-full transition-all duration-300">
                <FaFacebook className="text-white" />
              </a>
              <a href="https://x.com" className="bg-blue-500 hover:bg-blue-400 p-3 rounded-full transition-all duration-300">
                <FaTwitter className="text-white" />
              </a>
              <a href="https://instagram.com" className="bg-pink-600 hover:bg-pink-500 p-3 rounded-full transition-all duration-300">
                <FaInstagram className="text-white" />
              </a>
              <a href="https://linkedin.com" className="bg-blue-600 hover:bg-blue-500 p-3 rounded-full transition-all duration-300">
                <FaLinkedin className="text-white" />
              </a>
              <a href="https://youtube.com" className="bg-red-600 hover:bg-red-500 p-3 rounded-full transition-all duration-300">
                <FaYoutube className="text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 pb-2 border-b-2 border-blue-500 inline-block">
              Quick Links
            </h3>
           <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.name}>
          <Link
            to={link.path}
            className="text-blue-100 hover:text-white flex items-center transition-all duration-300 group"
          >
            <FaShieldAlt className="mr-3 text-blue-300 group-hover:text-teal-300" />
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 pb-2 border-b-2 border-blue-500 inline-block">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-teal-300 mt-1 mr-3 flex-shrink-0" />
                <span>123 Insurance Plaza, Financial District, Dhaka 1000</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-teal-300 mr-3" />
                <span>+880123456789</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-teal-300 mr-3" />
                <span>support@lifepolicypulse.com</span>
              </li>
            </ul>
           
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-blue-700 mt-12 pt-8 pb-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-blue-200 text-sm">
            © {new Date().getFullYear()} LifePolicyPulse. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {['Privacy Policy', 'Terms of Service', 'Security', 'Compliance'].map((item) => (
              <a 
                key={item} 
                href="#"
                className="text-blue-200 hover:text-white text-sm transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;