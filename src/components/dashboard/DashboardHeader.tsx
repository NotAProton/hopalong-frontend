import { motion } from "motion/react";

interface DashboardHeaderProps {
  name: string;
}

const DashboardHeader = ({ name }: DashboardHeaderProps) => {
  // Extract first name
  const firstName = name.split("@")[0].replace(/\./g, " ");

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      repeat: Infinity,
      repeatType: "reverse" as const,
      duration: 2,
    },
  };

  return (
    <div className="bg-gradient-to-r from-yellow-400 to-amber-500 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex justify-between items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <motion.h1
              className="text-3xl font-bold text-white mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Welcome, {firstName}!
            </motion.h1>
            <motion.p
              className="text-yellow-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Ready for your next journey?
            </motion.p>
          </div>

          <motion.div
            className="h-12 w-12 bg-white rounded-full flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.1 }}
            animate={pulseAnimation}
          >
            <span className="text-yellow-500 text-xl font-bold">
              {name.charAt(0).toUpperCase()}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardHeader;
