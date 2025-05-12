import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { EventProvider } from "./context/eventContext";

// Pages and Components
import OrganizerPage from "./UiComponents/OrganizerPage";
import ExcelUpload from "./UiComponents/ExcelUpload";
import FinalPage from "./UiComponents/FinalPage";
import ProtectedRoute from "./authentication/ProtectedRoute";
import Dashboard from "./UiComponents/Dashboard";
import {Toaster} from "react-hot-toast";

function App() {
  // Define the authentication handler
  const handleAuth = () => {
    console.log("✅ Authenticated successfully!");
  
  };

  return (
    <EventProvider>
      <Router>
        <Routes>
          {/* Redirect '/' to '/create-event' */}
          <Route path="/" element={<Navigate to="/create-event" replace />} />

          {/* OrganizerPage mapped to /create-event */}
          <Route path="/create-event" element={<OrganizerPage onAuth={handleAuth} />} />

          {/* Protected route for Excel Upload */}
          <Route
            path="/:eventId"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/reveal-secret-santa" element={<FinalPage />} />

          {/* Optional fallback for undefined routes */}
          <Route path="*" element={<Navigate to="/create-event" replace />} />
        </Routes>
      </Router>

      <Toaster />
    </EventProvider>
  );
}

export default App;