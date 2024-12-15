  import React, { useEffect, useState } from "react";
  import { useParams } from "react-router-dom";
  import axiosInstance from "../config/axiosConfig";
  import ReactMarkdown from "react-markdown";

  const DocumentDetailsPage = () => {
    const { id } = useParams();
    const [document, setDocument] = useState(null);
    const [accessRoles, setAccessRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedContent, setUpdatedContent] = useState("");

    useEffect(() => {
      fetchDocumentDetails();
      fetchAccessRoles();
    }, [id]);

    const fetchDocumentDetails = async () => {
      try {
        const response = await axiosInstance.get(`/documents/get-document/${id}`);
        setDocument(response.data);
        setUpdatedContent(response.data.content);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching document details:", error);
        setLoading(false);
      }
    };

    const fetchAccessRoles = async () => {
      try {
        const response = await axiosInstance.get(`/documents/${id}/get-access`);
        const { documentOwner, teamMembers, editors, viewers } = response.data;
        const roles = [
          documentOwner,
          ...teamMembers,
          ...editors,
          ...viewers,
        ].filter(Boolean);
        setAccessRoles(roles);
      } catch (error) {
        console.error("Error fetching access roles:", error);
      }
    };

    const handleContentUpdate = async () => {
      try {
        const response = await axiosInstance.put(`/documents/${id}/update`, {
          content: updatedContent,
        });
        setDocument({ ...document, content: updatedContent });
        setIsEditing(false);
        alert("Document updated successfully.");
      } catch (error) {
        console.error("Error updating document:", error);
        alert("Failed to update the document.");
      }
    };

    const renderAccessProfiles = () => {
      const visibleProfiles = accessRoles.slice(0, 3);
      const remainingProfiles = accessRoles.slice(3);

      return (
        <div style={styles.accessContainer}>
          <h4>Access:</h4>
          <div style={styles.accessProfiles}>
            {visibleProfiles.map((role) => (
              <div key={role.id} style={styles.profile}>
                <span style={styles.profileName}>{role.name}</span>
                <span style={styles.profileRole}>{role.role}</span>
              </div>
            ))}
            {remainingProfiles.length > 0 && (
              <button
                style={styles.showMoreButton}
                onClick={() => setShowPopup(true)}
              >
                +{remainingProfiles.length} More
              </button>
            )}
          </div>
          {showPopup && (
            <div style={styles.popupContainer}>
              <div style={styles.popupContent}>
                <h3>All Users with Access</h3>
                {accessRoles.map((role) => (
                  <div key={role.id} style={styles.profile}>
                    <span style={styles.profileName}>{role.name}</span>
                    <span style={styles.profileRole}>{role.role}</span>
                  </div>
                ))}
                <button
                  style={styles.closePopupButton}
                  onClick={() => setShowPopup(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      );
    };

    const renderDocumentContent = () => {
      if (isEditing) {
        return (
          <textarea
            style={styles.editor}
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
          />
        );
      }
      return <ReactMarkdown>{document?.content}</ReactMarkdown>;
    };

    const styles = {
      pageContainer: {
        marginLeft: "250px",
        marginTop: "60px",
        padding: "30px",
        backgroundColor: "#FAFAFA",
        minHeight: "calc(100vh - 60px)",
        fontFamily: "'Inter', sans-serif",
        color: "#2D2D2D",
      },
      header: {
        marginBottom: "20px",
      },
      documentName: {
        fontSize: "28px",
        fontWeight: "bold",
        marginBottom: "10px",
      },
      path: {
        color: "#555",
        marginBottom: "20px",
      },
      accessContainer: {
        marginBottom: "20px",
      },
      accessProfiles: {
        display: "flex",
        gap: "10px",
      },
      profile: {
        backgroundColor: "#e1f0e0",
        padding: "10px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      },
      profileName: {
        fontWeight: "bold",
      },
      profileRole: {
        fontStyle: "italic",
      },
      showMoreButton: {
        backgroundColor: "#00B37E",
        color: "#fff",
        border: "none",
        padding: "5px 10px",
        borderRadius: "5px",
        cursor: "pointer",
      },
      contentContainer: {
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      },
      editor: {
        width: "100%",
        minHeight: "200px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        padding: "10px",
        fontSize: "16px",
      },
      editButton: {
        backgroundColor: "#00B37E",
        color: "#fff",
        border: "none",
        padding: "10px 15px",
        borderRadius: "5px",
        cursor: "pointer",
      },
      saveButton: {
        backgroundColor: "#00B37E",
        color: "#fff",
        border: "none",
        padding: "10px 15px",
        borderRadius: "5px",
        marginRight: "10px",
        cursor: "pointer",
      },
      cancelButton: {
        backgroundColor: "#f44336",
        color: "#fff",
        border: "none",
        padding: "10px 15px",
        borderRadius: "5px",
        cursor: "pointer",
      },
      popupContainer: {
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      popupContent: {
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "10px",
        width: "400px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      },
      closePopupButton: {
        backgroundColor: "#f44336",
        color: "#fff",
        border: "none",
        padding: "10px 15px",
        borderRadius: "5px",
        cursor: "pointer",
      },
    };

    if (loading) return <div>Loading...</div>;

    return (
      <div style={styles.pageContainer}>
        <div style={styles.header}>
          <div style={styles.documentName}>{document?.name}</div>
          <div style={styles.path}>Path: {document?.path}</div>
        </div>
        {renderAccessProfiles()}
        <div style={styles.contentContainer}>
          {renderDocumentContent()}
          {!isEditing && (
            <button style={styles.editButton} onClick={() => setIsEditing(true)}>
              Edit
            </button>
          )}
          {isEditing && (
            <div>
              <button style={styles.saveButton} onClick={handleContentUpdate}>
                Save
              </button>
              <button
                style={styles.cancelButton}
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  export default DocumentDetailsPage;
