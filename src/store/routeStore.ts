import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Interface for a location (origin or destination)
interface Location {
  name: string;
  formattedAddress: string;
  latitude: number;
  longitude: number;
}

interface RouteState {
  from: Location | null;
  to: Location | null;
  rideDateTime: Date | null;

  // Actions
  setFrom: (location: Location | null) => void;
  setTo: (location: Location | null) => void;
  setRoute: (from: Location | null, to: Location | null) => void;
  setRideDateTime: (dateTime: Date | null) => void;
  clearRoute: () => void;
  resetOnPageLoad: () => void; // New method to reset state on page load
}

export const useRouteStore = create<RouteState>()(
  persist(
    (set) => ({
      from: null,
      to: null,
      rideDateTime: null,

      setFrom: (location: Location | null): void => {
        set(() => ({ from: location }));
      },

      setTo: (location: Location | null): void => {
        set(() => ({ to: location }));
      },

      setRoute: (from: Location | null, to: Location | null): void => {
        set(() => ({ from, to }));
      },

      setRideDateTime: (dateTime: Date | null): void => {
        set(() => ({ rideDateTime: dateTime }));
      },

      clearRoute: (): void => {
        set(() => ({ from: null, to: null, rideDateTime: null }));
      },

      resetOnPageLoad: (): void => {
        // Clear the from and to locations when a page loads
        set(() => ({ from: null, to: null, rideDateTime: null }));
      },
    }),
    {
      name: "hopalong-route-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
