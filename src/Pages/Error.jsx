import { motion } from "framer-motion";
import { Link } from "react-router";

const Error = () => {
  return (
    <>
      <title>Page Not Found | LifepolicyPulse</title>
      <meta
        name="description"
        content="We couldn't find the page you're looking for"
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center py-12">
        <div className="w-11/12  text-center">
          {/* Animated floating elements */}
          <div className="relative">
            <motion.div
              className="absolute -top-20 -left-10 w-24 h-24 rounded-full bg-purple-200 blur-xl opacity-70"
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-blue-200 blur-xl opacity-70"
              animate={{
                y: [0, 20, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10">
            {/* Animated 404 */}
            <div className="flex justify-center mb-6">
              <motion.span
                className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
                animate={{
                  scale: [1, 1.05, 1],
                  textShadow: [
                    "0 0 0px rgba(79, 70, 229, 0.3)",
                    "0 0 20px rgba(124, 58, 237, 0.5)",
                    "0 0 0px rgba(79, 70, 229, 0.3)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}>
                404
              </motion.span>
            </div>

            <motion.h1
              className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}>
              Policy Page Missing
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 max-w-2xl mx-auto mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}>
              The coverage you're looking for has lapsed. Don't worry though -
              we've got plenty of protection plans available.
            </motion.p>

            {/* Animated button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              <Link
                to="/"
                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                Return to Safety
              </Link>
            </motion.div>

           
          </motion.div>

          {/* Animated floating insurance card */}
          <motion.div
            className="mt-20 mx-auto max-w-xs bg-white p-6 rounded-xl shadow-lg border border-purple-100"
            animate={{
              y: [0, -15, 0],
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}>
            <div className="flex items-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
              <div className="ml-4">
                <div className="h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full w-32 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded-full w-24"></div>
              </div>
            </div>
            <div className="mt-4 h-3 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full w-full"></div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Error;
