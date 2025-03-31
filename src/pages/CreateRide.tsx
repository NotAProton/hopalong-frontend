import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import Map from "../components/Map";
import RideDetails from "../components/RideDetails";

const CreateRide = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Section */}
      <motion.header
        className="bg-white shadow-md py-4 px-6 flex items-center justify-between"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <div className="flex items-center gap-4">
          <motion.div
            className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
          >
            <Icon icon="mdi:account" className="text-white text-2xl" />
          </motion.div>
          <h1 className="text-xl font-bold text-gray-800">Create Ride</h1>
        </div>
      </motion.header>

      {/* Map Section */}
      <div className="flex-1 flex">
        <Map />
      </div>

      {/* Ride Details Section */}
      <motion.div
        className="bg-white shadow-lg p-6"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <RideDetails />
      </motion.div>
    </div>
  );
};

export default CreateRide;
