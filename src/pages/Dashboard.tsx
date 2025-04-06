import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Button from "../components/Button";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import RideCard from "../components/dashboard/RideCard";
import { API_DOMAIN } from "../env";
import { useEffect, useState } from "react";

interface PrimaryRoute {
  startPlaceName: string;
  endPlaceName: string;
  startLat: number;
  startLon: number;
  endLat: number;
  endLon: number;
  distance: number;
}

interface RideMember {
  id: string;
  firstName: string;
  lastName: string;
  profilePic: string;
}

interface RideRes {
  id: string;
  primaryRouteId: string;
  ownerId: string;
  start: string;
  totalCost: number;
  createdAt: string;
  primaryRoute: PrimaryRoute;
  members: RideMember[];
  owner: {
    id: string;
    firstName: string;
    lastName: string;
    profilePic: string;
  };
  _count: {
    messages: number;
  };
}

interface Ride {
  id: string;
  startPlaceAddress: string;
  endPlaceAddress: string;
  memberCount: number;
  owner: {
    id: string;
    firstName: string;
    lastName: string;
    profilePic: string;
  };
  dist: number;
  cost: number;
  date: string;
  from: string;
  to: string;
  status: string; // Adjust this type as needed
}

const Dashboard = () => {
  const { user, token } = useAuthStore();
  const navigate = useNavigate();

  if (!user) {
    void navigate("/login");
  }

  //fetch previous rides from API
  const [previousRides, setPreviousRides] = useState<Ride[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch previous rides on component mount
  useEffect(() => {
    const fetchPreviousRides = async () => {
      if (!token) return;

      try {
        const response = await fetch(`${API_DOMAIN}/api/rides/previous`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          void navigate("/login");
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch previous rides");
        }

        const data = (await response.json()) as {
          success: boolean;
          rides: RideRes[];
        };

        // Remap the response data to match the expected RideProps type
        const mappedRides: Ride[] = Array.isArray(data.rides)
          ? data.rides.map((ride) => ({
              id: ride.id,
              startPlaceAddress: ride.primaryRoute.startPlaceName || "",
              endPlaceAddress: ride.primaryRoute.endPlaceName || "",
              memberCount: ride.members.length + 1, // +1 for the owner
              owner: {
                id: ride.owner.id,
                firstName: ride.owner.firstName,
                lastName: ride.owner.lastName || "",
                profilePic: ride.owner.profilePic,
              },
              dist:
                typeof ride.primaryRoute.distance === "number"
                  ? ride.primaryRoute.distance
                  : 0,
              cost: typeof ride.totalCost === "number" ? ride.totalCost : 0,
              date: ride.start,
              from: ride.primaryRoute.startPlaceName || "",
              to: ride.primaryRoute.endPlaceName || "",
              status: "Upcoming", // Since these are previous rides
            }))
          : [];

        setPreviousRides(mappedRides);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    void fetchPreviousRides();
  }, [token, navigate]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <DashboardHeader name={user?.email ?? "User"} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mt-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Create New Ride Button */}
          <motion.div className="mb-8" variants={childVariants}>
            <Link to="/create-ride">
              <Button
                fullWidth
                icon="mdi:plus-circle"
                className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600"
              >
                Create New Ride
              </Button>
            </Link>
          </motion.div>

          {/* Error message display */}
          {error && (
            <motion.div
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6"
              variants={childVariants}
            >
              <p className="font-medium">Error loading rides</p>
              <p className="text-sm">{error}</p>
            </motion.div>
          )}

          {/* Previous Rides Section */}
          <motion.div variants={childVariants}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Your Rides</h2>
              <motion.div
                className="text-sm text-yellow-500 font-medium cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All
              </motion.div>
            </div>

            {isLoading ? (
              <motion.div
                className="bg-white rounded-lg shadow p-6 text-center"
                variants={childVariants}
              >
                <p className="text-gray-500">Loading your rides...</p>
              </motion.div>
            ) : previousRides.length > 0 ? (
              <div className="space-y-4">
                {previousRides.map((ride) => (
                  <RideCard
                    key={ride.id}
                    ride={ride}
                    isLoading={false}
                    onViewDetails={() => {
                      void navigate(`/rides/${ride.id}`);
                    }}
                  />
                ))}
              </div>
            ) : (
              <motion.div
                className="bg-white rounded-lg shadow p-6 text-center"
                variants={childVariants}
              >
                <p className="text-gray-500">
                  You haven't taken any rides yet.
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
