import React from "react";
import {
  Search,
  User,
  Bell,
  Plus,
  Edit,
  Share,
  Trash,
  ChevronRight,
  Users,
} from "lucide-react";

export default function DashboardPage() {
  const user = {
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
  };

  const documents = [
    {
      id: 1,
      title: "Project Proposal",
      lastModified: "October 15, 2024",
      role: "Owner",
      canEdit: true,
      canShare: true,
      canDelete: true,
    },
    {
      id: 2,
      title: "Research Paper",
      lastModified: "October 18, 2024",
      role: "Viewer",
      canEdit: false,
      canShare: true,
      canDelete: false,
    },
    {
      id: 3,
      title: "Meeting Notes",
      lastModified: "October 19, 2024",
      role: "Owner",
      canEdit: true,
      canShare: true,
      canDelete: true,
    },
    {
      id: 4,
      title: "Budget Report",
      lastModified: "October 20, 2024",
      role: "Editor",
      canEdit: true,
      canShare: true,
      canDelete: false,
    },
  ];

  const recentActivity = [
    {
      id: 1,
      message: "John Doe edited 'Project Proposal' on October 19, 2024",
    },
    {
      id: 2,
      message: "You shared 'Research Paper' with Jane Doe on October 20, 2024",
    },
    {
      id: 3,
      message: "Emily Smith commented on 'Meeting Notes' on October 21, 2024",
    },
    { id: 4, message: "You created 'Budget Report' on October 20, 2024" },
  ];

  const collaborators = [
    { id: 1, name: "John Doe", role: "Editor on 'Project Proposal'" },
    { id: 2, name: "Jane Doe", role: "Viewer on 'Research Paper'" },
    { id: 3, name: "Emily Smith", role: "Owner on 'Meeting Notes'" },
    { id: 4, name: "Mike Brown", role: "Editor on 'Budget Report'" },
  ];

  return (
    <div className="dashboard">
      <header>
        <div className="logo">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="#3B82F6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 17L12 22L22 17"
              stroke="#3B82F6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12L12 17L22 12"
              stroke="#3B82F6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>SyncDocs</span>
        </div>
        <div className="search-bar">
          <Search size={20} />
          <input type="text" placeholder="Search documents..." />
        </div>
        <div className="user-actions">
          <button className="icon-button" aria-label="Notifications">
            <Bell size={20} />
          </button>
          <div className="user-profile">
            <img src={user.avatar} alt={user.name} className="avatar" />
            <span>{user.name}</span>
          </div>
        </div>
      </header>
      <div className="main-content">
        <nav className="sidebar">
          <ul>
            <li className="active">
              <a href="#dashboard">Dashboard</a>
            </li>
            <li>
              <a href="#my-documents">My Documents</a>
            </li>
            <li>
              <a href="#shared-with-me">Shared With Me</a>
            </li>
            <li>
              <a href="#collaborators">Collaborators</a>
            </li>
            <li>
              <a href="#templates">Templates</a>
            </li>
            <li>
              <a href="#settings">Settings</a>
            </li>
            <li>
              <a href="#help-center">Help Center</a>
            </li>
          </ul>
        </nav>
        <main>
          <section className="welcome-banner">
            <h1>Welcome back, {user.name}!</h1>
            <button className="cta-button">
              <Plus size={20} />
              Create New Document
            </button>
          </section>
          <section className="quick-actions">
            <h2>Quick Actions</h2>
            <div className="action-buttons">
              <button className="action-button">
                <Edit size={20} />
                Edit Recent
              </button>
              <button className="action-button">
                <Share size={20} />
                Share Document
              </button>
              <button className="action-button">
                <Users size={20} />
                Manage Team
              </button>
            </div>
          </section>
          <section className="document-overview">
            <h2>Your Documents</h2>
            <div className="document-cards">
              {documents.map((doc) => (
                <div key={doc.id} className="document-card">
                  <h3>{doc.title}</h3>
                  <p>Last modified: {doc.lastModified}</p>
                  <p>Role: {doc.role}</p>
                  <div className="document-actions">
                    <button className="icon-button" aria-label="View">
                      <ChevronRight size={20} />
                    </button>
                    {doc.canEdit && (
                      <button className="icon-button" aria-label="Edit">
                        <Edit size={20} />
                      </button>
                    )}
                    {doc.canShare && (
                      <button className="icon-button" aria-label="Share">
                        <Share size={20} />
                      </button>
                    )}
                    {doc.canDelete && (
                      <button className="icon-button" aria-label="Delete">
                        <Trash size={20} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className="document-stats">
            <h2>Document Statistics</h2>
            <div className="stat-cards">
              <div className="stat-card">
                <h3>Total Documents</h3>
                <p>15</p>
              </div>
              <div className="stat-card">
                <h3>Shared Documents</h3>
                <p>7</p>
              </div>
              <div className="stat-card">
                <h3>Recent Edits</h3>
                <p>23</p>
              </div>
            </div>
          </section>
          <section className="recent-activity">
            <h2>Recent Activity</h2>
            <ul className="activity-feed">
              {recentActivity.map((activity) => (
                <li key={activity.id}>{activity.message}</li>
              ))}
            </ul>
          </section>
          <section className="collaboration">
            <h2>Collaboration Overview</h2>
            <ul className="collaborators-list">
              {collaborators.map((collaborator) => (
                <li key={collaborator.id}>
                  <strong>{collaborator.name}</strong> - {collaborator.role}
                </li>
              ))}
            </ul>
            <button className="cta-button">
              <Plus size={20} />
              Invite New Collaborator
            </button>
          </section>
        </main>
      </div>
      <footer>
        <a href="/terms">Terms of Service</a>
        <a href="/privacy">Privacy Policy</a>
        <a href="/help">Help Center</a>
      </footer>

      <style jsx>{`
        .dashboard {
          font-family: "Inter", sans-serif;
          color: #1f2937;
          background-color: #f9fafb;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        header {
          background-color: #ffffff;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .logo {
          display: flex;
          align-items: center;
          font-size: 1.5rem;
          font-weight: bold;
          color: #3b82f6;
        }

        .logo svg {
          margin-right: 0.5rem;
        }

        .search-bar {
          display: flex;
          align-items: center;
          background-color: #f3f4f6;
          border-radius: 9999px;
          padding: 0.5rem 1rem;
          width: 300px;
        }

        .search-bar input {
          border: none;
          background: transparent;
          margin-left: 0.5rem;
          width: 100%;
        }

        .user-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .icon-button {
          background: none;
          border: none;
          cursor: pointer;
          color: #4b5563;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        .main-content {
          display: flex;
          flex: 1;
        }

        .sidebar {
          width: 250px;
          background-color: #ffffff;
          padding: 2rem 0;
          box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
        }

        .sidebar ul {
          list-style-type: none;
          padding: 0;
        }

        .sidebar li {
          padding: 0.5rem 2rem;
        }

        .sidebar li.active {
          background-color: #eff6ff;
          border-left: 4px solid #3b82f6;
        }

        .sidebar a {
          color: #4b5563;
          text-decoration: none;
          font-weight: 500;
        }

        main {
          flex: 1;
          padding: 2rem;
          overflow-y: auto;
        }

        section {
          background-color: #ffffff;
          border-radius: 8px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        h1 {
          font-size: 2rem;
          color: #1e40af;
          margin-bottom: 1rem;
        }

        h2 {
          font-size: 1.5rem;
          color: #1e40af;
          margin-bottom: 1rem;
        }

        .cta-button {
          background-color: #3b82f6;
          color: #ffffff;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 9999px;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: background-color 0.3s ease;
        }

        .cta-button:hover {
          background-color: #2563eb;
        }

        .quick-actions {
          margin-top: 2rem;
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
        }

        .action-button {
          background-color: #eff6ff;
          color: #3b82f6;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: background-color 0.3s ease;
        }

        .action-button:hover {
          background-color: #dbeafe;
        }

        .document-cards {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1rem;
        }

        .document-card {
          background-color: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 1rem;
          transition: box-shadow 0.3s ease;
        }

        .document-card:hover {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .document-actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .stat-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }

        .stat-card {
          background-color: #eff6ff;
          border-radius: 8px;
          padding: 1rem;
          text-align: center;
        }

        .stat-card h3 {
          font-size: 1rem;
          color: #4b5563;
          margin-bottom: 0.5rem;
        }

        .stat-card p {
          font-size: 2rem;
          font-weight: bold;
          color: #3b82f6;
        }

        .activity-feed {
          list-style-type: none;
          padding: 0;
        }

        .activity-feed li {
          padding: 0.5rem 0;
          border-bottom: 1px solid #e5e7eb;
        }

        .activity-feed li:last-child {
          border-bottom: none;
        }

        .collaborators-list {
          list-style-type: none;
          padding: 0;
        }

        .collaborators-list li {
          padding: 0.5rem 0;
        }

        footer {
          background-color: #ffffff;
          padding: 1rem 2rem;
          display: flex;
          justify-content: center;
          gap: 2rem;
          box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
        }

        footer a {
          color: #4b5563;
          text-decoration: none;
        }

        @media (max-width: 768px) {
          .main-content {
            flex-direction: column;
          }

          .sidebar {
            width: 100%;
            padding: 1rem 0;
          }

          .search-bar {
            width: 100%;
            margin: 1rem 0;
          }

          .document-cards {
            grid-template-columns: 1fr;
          }

          .stat-cards {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
