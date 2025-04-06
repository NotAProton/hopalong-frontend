import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import { useAuthStore } from "../store/authStore";
import { API_DOMAIN } from "../env";

import TabGroup, { Tab } from "../components/tabs/TabGroup";
import RouteMap from "../components/rides/RouteMap";
import MembersList from "../components/rides/MembersList";
import CostSplit from "../components/rides/CostSplit";

interface RideData {
  id: string;
  primaryRouteId: string;
  ownerId: string;
  start: string;
  totalCost: number;
  createdAt: string;
  primaryRoute: {
    startPlaceName: string;
    endPlaceName: string;
    distance: number;
  };
  members: {
    id: string;
    firstName: string;
    lastName: string;
    profilePic?: string;
  }[];
  owner: {
    id: string;
    firstName: string;
    lastName: string;
    profilePic?: string;
  };
}

const RideDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { token } = useAuthStore();

  const [ride, setRide] = useState<RideData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRideDetails = async () => {
      if (!token || !id) return;

      try {
        setIsLoading(true);
        const response = await fetch(`${API_DOMAIN}/api/rides/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          void navigate("/login");
        }

        if (!response.ok) {
          throw new Error("Failed to fetch ride details");
        }

        const data = (await response.json()) as {
          success: boolean;
          ride?: RideData;
        };
        if (data.success && data.ride) {
          setRide(data.ride);
        } else {
          throw new Error("Failed to load ride details");
        }
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    void fetchRideDetails();
  }, [id, token, navigate]);

  // Prepare data for cost split
  const costData =
    !isLoading && ride
      ? [
          // Owner
          {
            memberId: ride.owner.id,
            name: `${ride.owner.firstName} ${ride.owner.lastName || ""}`,
            distance: 10, // Mock data - would be replaced with actual distance
            amount: ride.totalCost * 0.6, // Mock calculation
            sharePercentage: 60,
            isPaid: true,
          },
          // Other members
          ...ride.members.map((member) => ({
            memberId: member.id,
            name: `${member.firstName} ${member.lastName || ""}`,
            distance: 5, // Mock data
            amount: (ride.totalCost * 0.4) / ride.members.length, // Split remaining 40% among members
            sharePercentage: 40 / ride.members.length,
            isPaid: false,
          })),
        ]
      : [];

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-IN", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <motion.div
        className="bg-gradient-to-r from-yellow-400 to-amber-500 pt-16 pb-6"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <button
              type="button"
              onClick={() => void navigate(-1)}
              className="p-2 mr-4 rounded-full bg-white/20 text-white hover:bg-white/30"
            >
              <Icon icon="mdi:arrow-left" className="text-xl" />
            </button>

            <div>
              <h1 className="text-2xl font-bold text-white">
                {isLoading
                  ? "Loading ride details..."
                  : ride
                  ? "Ride to " + ride.primaryRoute.endPlaceName.split(",")[0]
                  : "Ride Details"}
              </h1>
              <p className="text-yellow-100">
                {!isLoading && ride && formatDate(ride.start)}
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-5">
        <motion.div
          className="bg-white rounded-lg shadow-md overflow-hidden"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {error ? (
            <div className="p-6 text-center">
              <Icon
                icon="mdi:alert-circle"
                className="text-red-500 text-4xl mb-3"
              />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Failed to load ride
              </h3>
              <p className="text-gray-600">{error}</p>
              <button
                type="button"
                onClick={() => void navigate(-1)}
                className="mt-4 px-4 py-2 bg-gray-100 rounded-md text-gray-800 font-medium"
              >
                Go Back
              </button>
            </div>
          ) : (
            <div className="p-6">
              <TabGroup>
                <Tab label="Route" icon="mdi:map-marker">
                  <RouteMap
                    startPlace={ride?.primaryRoute.startPlaceName ?? ""}
                    endPlace={ride?.primaryRoute.endPlaceName ?? ""}
                    startTime={ride?.start ?? ""}
                    isLoading={isLoading}
                    distance={ride?.primaryRoute.distance ?? 0}
                  />
                </Tab>

                <Tab label="Members" icon="mdi:account-group">
                  <MembersList
                    members={
                      !isLoading && ride
                        ? [{ ...ride.owner, isOwner: true }, ...ride.members]
                        : []
                    }
                    isLoading={isLoading}
                  />
                </Tab>

                <Tab label="Cost Split" icon="mdi:cash">
                  <CostSplit
                    costs={costData}
                    totalCost={ride?.totalCost ?? 0}
                    isLoading={isLoading}
                  />
                </Tab>
              </TabGroup>

              {!isLoading && ride && (
                <motion.div
                  className="mt-8 flex justify-between items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.button
                    className="px-5 py-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-white rounded-md font-medium flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => void navigate(`/chat?rideId=${ride.id}`)}
                  >
                    <Icon icon="mdi:chat" className="mr-2" />
                    Open Chat
                  </motion.button>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default RideDetail;
