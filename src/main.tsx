import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.tsx";
import SignUp from "./pages/Signup.tsx";
import CreateRide from "./pages/CreateRide";
import Dashboard from "./pages/Dashboard.tsx";
import FindingRide from "./pages/FindingRide.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import App from "./App.tsx";
import PickRidePage from "./pages/PickRidePage.tsx";
import ChatPage from "./pages/ChatPage.tsx";
import RideDetail from "./pages/RideDetail.tsx";

const queryClient = new QueryClient();

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-ride" element={<CreateRide />} />
            <Route path="/finding-ride" element={<FindingRide />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pick-ride" element={<PickRidePage />} />
            <Route path="/rides/:id" element={<RideDetail />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </StrictMode>
  );
}
