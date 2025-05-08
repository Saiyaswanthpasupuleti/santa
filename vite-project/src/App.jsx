import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import OrganizerPage from "./UiComponents/OrganizerPage";
import ExcelUpload from "./UiComponents/ExcelUpload";
// import ParticipantList from "./UiComponents/ParticipantList";
import ParticipantList from "./UiComponents/ParcipentList";
import FinalPage from "./UiComponents/FinalPage";
import { useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuth = () => {
    if(eventId)
    setIsAuthenticated(true);
  };

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OrganizerPage  onAuth={handleAuth} />} />
        <Route
          path="/excel"
          element={
            <ProtectedRoute>
              <ExcelUpload />
            </ProtectedRoute>
          }
        />
        <Route path="/participants" element={<ParticipantList />} />
        <Route path="/final" element={<FinalPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
