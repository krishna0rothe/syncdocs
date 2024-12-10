import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../config/axiosConfig";

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [folders, setFolders] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [expandedFolders, setExpandedFolders] = useState({});
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [formType, setFormType] = useState(""); // 'document' or 'folder'
  const [newItem, setNewItem] = useState({
    name: "",
    content: "",
    description: "",
    parentFolderId: null,
  });

  useEffect(() => {
    axiosInstance
      .get(`/projects/project/${id}`)
      .then((response) => {
        setProject(response.data.project);
        setFolders(response.data.folders);
        setDocuments(response.data.documents);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  const handleFolderClick = (folderId) => {
    setExpandedFolders((prevState) => ({
      ...prevState,
      [folderId]: !prevState[folderId],
    }));
  };

  const handleDocumentClick = (documentId) => {
    console.log("Document clicked:", documentId);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleAddItemClick = (type, parentId) => {
    setFormType(type);
    setNewItem({ ...newItem, parentFolderId: parentId });
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setNewItem({
      name: "",
      content: "",
      description: "",
      parentFolderId: null,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleFormSubmit = () => {
    if (formType === "document") {
      const documentData = {
        name: newItem.name,
        content: newItem.content,
        project: id,
        folder: newItem.parentFolderId || "",
      };

      axiosInstance
        .post("/projects/create-document", documentData)
        .then((response) => {
          setDocuments((prevDocs) => [...prevDocs, response.data]);
          handlePopupClose();
        })
        .catch((error) => {
          console.error("Error creating document:", error);
        });
    } else if (formType === "folder") {
      const folderData = {
        name: newItem.name,
        project: id,
        parent: newItem.parentFolderId || null,
      };

      axiosInstance
        .post("/projects/create-folder", folderData)
        .then((response) => {
          setFolders((prevFolders) => [...prevFolders, response.data]);
          handlePopupClose();
        })
        .catch((error) => {
          console.error("Error creating folder:", error);
        });
    }
  };

  const renderFolderTree = (folder) => {
    const isExpanded = expandedFolders[folder._id] || false;

    return (
      <li key={folder._id} style={styles.treeNode}>
        <div
          style={{
            ...styles.treeItem,
            backgroundColor: isExpanded ? "#A8D5BA" : "#e1f0e0", // Odoo green shades
          }}
          onClick={() => handleFolderClick(folder._id)}
        >
          📁 {folder.name}
          <div>
            <button
              style={styles.addButton}
              onClick={(e) => {
                e.stopPropagation();
                handleAddItemClick("document", folder._id);
              }}
            >
              Add Document
            </button>
            <button
              style={styles.addButton}
              onClick={(e) => {
                e.stopPropagation();
                handleAddItemClick("folder", folder._id);
              }}
            >
              Add Folder
            </button>
          </div>
        </div>
        {isExpanded && (
          <ul style={styles.subTreeList}>
            {folder.documents?.length > 0 ? (
              folder.documents.map((document) => (
                <li key={document._id} style={styles.treeNode}>
                  <div
                    style={{
                      ...styles.treeItem,
                      backgroundColor: "#F1F8F3", // Light green for documents
                    }}
                    onClick={() => handleDocumentClick(document._id)}
                  >
                    📄 {document.name}
                  </div>
                </li>
              ))
            ) : (
              <li style={styles.noContentMessage}>No documents available.</li>
            )}
            {folder.subFolders?.length > 0 &&
              folder.subFolders.map((subFolder) => renderFolderTree(subFolder))}
          </ul>
        )}
      </li>
    );
  };

  const renderRootDocuments = () => {
    return documents
      .filter((document) => !document.folder) // Filter root-level documents
      .map((document) => (
        <li key={document._id} style={styles.treeNode}>
          <div
            style={{
              ...styles.treeItem,
              backgroundColor: "#F1F8F3", // Light green for documents
            }}
            onClick={() => handleDocumentClick(document._id)}
          >
            📄 {document.name}
          </div>
        </li>
      ));
  };

  const renderRootFolders = () => {
    return folders
      .filter((folder) => !folder.parent) // Filter root-level folders
      .map((folder) => renderFolderTree(folder));
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
    projectName: {
      fontSize: "28px",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    projectInfo: {
      fontSize: "16px",
      color: "#6C757D",
    },
    treeContainer: {
      marginTop: "30px",
    },
    treeList: {
      listStyle: "none",
      paddingLeft: "20px",
    },
    subTreeList: {
      listStyle: "none",
      paddingLeft: "20px",
    },
    treeNode: {
      marginBottom: "10px",
    },
    treeItem: {
      padding: "10px 15px",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
      transition: "box-shadow 0.3s",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: "16px",
    },
    addButton: {
      marginLeft: "10px",
      backgroundColor: "#00B37E", // Odoo signature green
      color: "#fff",
      border: "none",
      padding: "5px 10px",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "14px",
      display: "inline-block",
      marginTop: "5px",
      marginBottom: "5px",
    },
    noContentMessage: {
      padding: "10px 15px",
      color: "#6C757D",
      fontStyle: "italic",
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
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      maxWidth: "500px",
      width: "100%",
    },
    inputField: {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      fontSize: "16px",
    },
    popupButton: {
      backgroundColor: "#00B37E",
      color: "#fff",
      border: "none",
      padding: "10px 20px",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
      width: "100%",
    },
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.pageContainer}>
      <div style={styles.header}>
        <div style={styles.projectName}>{project.name}</div>
        <div style={styles.projectInfo}>
          Created on: {formatDate(project.createdAt)}
        </div>
      </div>
      <div style={styles.treeContainer}>
        <h2>Documents & Folders</h2>
        <ul style={styles.treeList}>
          {renderRootFolders()}
          {renderRootDocuments()}
        </ul>
      </div>

      {showPopup && (
        <div style={styles.popupContainer}>
          <div style={styles.popupContent}>
            <h3>
              {formType === "document" ? "Create Document" : "Create Folder"}
            </h3>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newItem.name}
              onChange={handleInputChange}
              style={styles.inputField}
            />
            {formType === "document" && (
              <textarea
                name="content"
                placeholder="Content"
                value={newItem.content}
                onChange={handleInputChange}
                style={styles.inputField}
              />
            )}
            <button style={styles.popupButton} onClick={handleFormSubmit}>
              Submit
            </button>
            <button style={styles.popupButton} onClick={handlePopupClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetailsPage;
