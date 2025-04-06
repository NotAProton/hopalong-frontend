import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/ui/Spinner";
import { useRouteStore } from "../store/routeStore";
import { useAuthStore } from "../store/authStore";
import { RideMatch, useRideStore } from "../store/rideCreationStore";

import { API_DOMAIN } from "../env";

// Funny loading messages
const loadingMessages = [
  "Revving our engines...",
  "Calculating the optimal route to avoid traffic...",
  "Training pigeons for backup navigation...",
  "Scanning for shortcuts only locals know about...",
  "Bribing traffic lights to stay green...",
  "Warming up the seat heaters...",
  "Calculating how many songs you can listen to on this ride...",
  "Assigning your ride a cool codename...",
];

export default function FindingRide() {
  const navigate = useNavigate();
  const { from, to, rideDateTime } = useRouteStore();
  const { token } = useAuthStore();
  const { setRides } = useRideStore();
  const [messageIndex, setMessageIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Cycle through funny messages every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // API call to create the ride
  useEffect(() => {
    const createRide = async () => {
      if (!from || !to) {
        void navigate("/");
        return;
      }

      // Record the start time to ensure minimum loading time
      const startTime = Date.now();

      try {
        const response = await fetch(`${API_DOMAIN}/api/route/findMatch`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: JSON.stringify({
            token: token ?? "",
            start: `${from.latitude.toString()},${from.longitude.toString()}`,
            end: `${to.latitude.toString()},${to.longitude.toString()}`,
            startTime: rideDateTime?.toISOString(),
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to create ride");
        }

        // Type the response data properly
        const data: unknown = await response.json();

        if (
          data &&
          typeof data === "object" &&
          "success" in data &&
          data.success &&
          "matches" in data &&
          Array.isArray(data.matches) &&
          Array.isArray(data.matches)
        ) {
          setRides(data.matches as RideMatch[]); // Type the rides properly

          // Calculate remaining time to ensure full 5 seconds of loading
          const elapsedTime = Date.now() - startTime;
          const remainingTime = Math.max(5000 - elapsedTime, 0);

          setTimeout(() => {
            void navigate("/pick-ride");
          }, remainingTime);
        } else {
          if (
            data &&
            typeof data === "object" &&
            "message" in data &&
            typeof data.message === "string"
          ) {
            setError(data.message);
          }
          throw new Error("No matching rides found");
        }
      } catch (error) {
        console.error("Error creating ride:", error);
        setError(
          error instanceof Error ? error.message : "Unknown error occurred"
        );
      }
    };

    void createRide();
  }, [from, to, token, navigate, setRides, rideDateTime]);

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Finding Your Ride
          </h1>

          <div className="mb-6 flex justify-center">
            <Spinner size="lg" color="text-yellow-400" />
          </div>

          {/* Fixed height container to prevent layout shift */}
          <div className="h-16 flex items-center justify-center">
            <motion.p
              key={messageIndex}
              className="text-lg text-gray-600"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {loadingMessages[messageIndex]}
            </motion.p>
          </div>

          <div className="mt-6 py-4 px-6 bg-yellow-50 rounded-lg">
            <p className="text-sm text-gray-600">
              From: <span className="font-medium">{from?.name}</span>
            </p>
            <p className="text-sm text-gray-600 mt-1">
              To: <span className="font-medium">{to?.name}</span>
            </p>
          </div>

          {error && (
            <div className="mt-4 text-red-500 text-sm">Error: {error}</div>
          )}
        </div>

        <motion.div
          className="h-1 w-full bg-gradient-to-r from-yellow-400 to-amber-500 mt-6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ transformOrigin: "left" }}
        />
      </motion.div>
    </motion.div>
  );
}
