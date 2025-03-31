import { motion } from "motion/react";
import TextField from "./TextField";
import Button from "./Button";

const RideDetails = () => {
  return (
    <div className="space-y-6">
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <TextField
          name="pickupLocation"
          label="Pickup Location"
          placeholder="Enter pickup location"
          icon="mdi:map-marker"
        />
        <TextField
          name="dropoffLocation"
          label="Drop-off Location"
          placeholder="Enter drop-off location"
          icon="mdi:map-marker-check"
        />
      </motion.div>

      <motion.div
        className="flex justify-between items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Button
          icon="mdi:car"
          fullWidth
          onClick={() => {
            console.log("Ride Created");
          }}
        >
          Create Ride
        </Button>
      </motion.div>
    </div>
  );
};

export default RideDetails;
