import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import DashboardPage from "./pages/DashboardPage";
import ProjectsPage from "./pages/ProjectsPage";
import DocumentsPage from "./pages/DocumentsPage";
import TeamPage from "./pages/TeamPage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import LandingPage from "./pages/LandingPage";
import LogoutPage from "./pages/LogoutPage";
import CreateProjectPage from "./pages/CreateProjectPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import DocumentDetailsPage from "./pages/DocumentDetailsPage";

const AppLayout = ({ children }) => {
  const location = useLocation();

  // Define routes that require the full-screen layout
  const fullScreenRoutes = [
    "/login",
    "/signup",
    "/",
    "/logout",
    "/create-project",
  ];

  // Check if the current route is in the full-screen list
  const isFullScreen = fullScreenRoutes.includes(location.pathname);

  return isFullScreen ? (
    // Render full-screen layout
    <div>{children}</div>
  ) : (
    // Render main layout with top bar and sidebar
    <div>
      <Sidebar />
      <div >
        <Topbar />
        <div style={{ padding: "0" }}>{children}</div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          {/* Full-Screen Layout Pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegistrationPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/create-project" element={<CreateProjectPage />} />

          {/* Main Layout Pages */}
          <Route path="/home" element={<DashboardPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/project/:id" element={<ProjectDetailsPage />} />
          <Route path="/document/:id" element={<DocumentDetailsPage />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
