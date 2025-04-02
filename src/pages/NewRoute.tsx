import { useState } from "react";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import { usePlaceSuggestions } from "../hooks/usePlaceSuggestions";
import PlaceAutocomplete from "../components/PlaceAutocomplete";
import MapArt from "../components/MapArt";
import Button from "../components/Button";

const NewRoute = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");

  // Use suggestions hooks
  const { suggestions: fromSuggestions, isLoading: isLoadingFrom } =
    usePlaceSuggestions(fromQuery);

  const { suggestions: toSuggestions, isLoading: isLoadingTo } =
    usePlaceSuggestions(toQuery);

  // Handle input changes
  const handleFromChange = (value: string) => {
    setFrom(value);
    setFromQuery(value);
  };

  const handleToChange = (value: string) => {
    setTo(value);
    setToQuery(value);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here would be the logic to handle route creation
    console.log("Creating route from", from, "to", to);
  };

  // Check if both fields are filled and valid
  const isFormValid = from && to && from !== to;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <motion.header
        className="bg-white shadow-sm py-4"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 120,
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Icon
                icon="mdi:car-sports"
                className="text-yellow-400 text-3xl"
              />
              <span className="font-bold text-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-transparent bg-clip-text">
                HopAlong
              </span>
            </motion.div>

            <motion.button
              className="text-gray-600 flex items-center gap-1"
              whileHover={{ scale: 1.05, color: "#FBBF24" }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon icon="mdi:account-circle" className="text-2xl" />
              <span className="hidden md:inline">My Account</span>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main content */}
      <div className="flex-1 container mx-auto px-4 py-8">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-3xl font-bold mb-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Create a New{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-amber-500 text-transparent bg-clip-text">
              Route
            </span>
          </motion.h1>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <PlaceAutocomplete
                    label="From"
                    placeholder="Enter pickup location"
                    value={from}
                    onChange={handleFromChange}
                    suggestions={fromSuggestions}
                    isLoading={isLoadingFrom}
                    icon="mdi:map-marker-radius"
                    delay={0.1}
                  />

                  <PlaceAutocomplete
                    label="To"
                    placeholder="Enter destination"
                    value={to}
                    onChange={handleToChange}
                    suggestions={toSuggestions}
                    isLoading={isLoadingTo}
                    icon="mdi:map-marker-check"
                    delay={0.2}
                  />
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="pt-4"
                >
                  <Button
                    fullWidth={true}
                    icon="mdi:car-arrow-right"
                    disabled={!isFormValid}
                  >
                    Find Routes
                  </Button>
                </motion.div>

                {from && to && from === to && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm text-center"
                  >
                    Pickup and destination locations cannot be the same
                  </motion.div>
                )}
              </div>
            </form>
          </div>

          {/* Map visualization */}
          <div className="h-[500px] rounded-xl overflow-hidden shadow-lg">
            <MapArt />
          </div>

          {/* Information section */}
          <motion.div
            className="text-center mt-6 text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p>
              Enter your pickup and destination locations to find available
              routes.
            </p>
            <p className="text-sm mt-2">
              <Icon
                icon="mdi:information"
                className="inline-block mr-1 text-yellow-400"
              />
              You can only select from the suggested locations for accurate
              route planning.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        className="bg-white py-4 border-t border-gray-200 mt-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2023 HopAlong. All rights reserved.</p>
        </div>
      </motion.footer>
    </div>
  );
};

export default NewRoute;
