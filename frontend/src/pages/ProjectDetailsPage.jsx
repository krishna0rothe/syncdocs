import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../config/axiosConfig";

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [structure, setStructure] = useState(null);
  const [expandedFolders, setExpandedFolders] = useState({});
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [formType, setFormType] = useState(""); // 'document' or 'folder'
  const [newItem, setNewItem] = useState({
    name: "",
    parentFolderId: null,
  });

  useEffect(() => {
    axiosInstance
      .get(`/projects/project/${id}`)
      .then((response) => {
        setProject(response.data.project);
        setStructure(response.data.structure);
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

  const handleAddItemClick = (type, parentId) => {
    setFormType(type);
    setNewItem({ name: "", parentFolderId: parentId });
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setNewItem({ name: "", parentFolderId: null });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = () => {
    const apiEndpoint =
      formType === "document"
        ? "/projects/create-document"
        : "/projects/create-folder";
    const payload =
      formType === "document"
        ? {
            name: newItem.name,
            project: id,
            folder: newItem.parentFolderId,
          }
        : {
            name: newItem.name,
            project: id,
            parent: newItem.parentFolderId,
          };

    axiosInstance
      .post(apiEndpoint, payload)
      .then((response) => {
        if (formType === "document") {
          // Add new document to the relevant folder
          const updatedStructure = { ...structure };
          const addDocumentToFolder = (folders) => {
            folders.forEach((folder) => {
              if (folder._id === newItem.parentFolderId) {
                folder.documents.push(response.data);
              } else if (folder.subFolders.length > 0) {
                addDocumentToFolder(folder.subFolders);
              }
            });
          };
          if (newItem.parentFolderId) {
            addDocumentToFolder(updatedStructure.folders);
          } else {
            updatedStructure.rootDocuments.push(response.data);
          }
          setStructure(updatedStructure);
        } else {
          // Add new folder to the relevant parent folder
          const updatedStructure = { ...structure };
          const addFolderToParent = (folders) => {
            folders.forEach((folder) => {
              if (folder._id === newItem.parentFolderId) {
                folder.subFolders.push(response.data);
              } else if (folder.subFolders.length > 0) {
                addFolderToParent(folder.subFolders);
              }
            });
          };
          if (newItem.parentFolderId) {
            addFolderToParent(updatedStructure.folders);
          } else {
            updatedStructure.folders.push(response.data);
          }
          setStructure(updatedStructure);
        }
        handlePopupClose();
      })
      .catch((error) => console.error("Error creating item:", error));
  };

  const renderFolderTree = (folder) => {
    const isExpanded = expandedFolders[folder._id] || false;

    return (
      <li key={folder._id} style={styles.treeNode}>
        <div
          style={{
            ...styles.treeItem,
            backgroundColor: isExpanded ? "#A8D5BA" : "#e1f0e0",
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
            {folder.documents.map((document) => (
              <li key={document._id} style={styles.treeNode}>
                <div
                  style={{
                    ...styles.treeItem,
                    backgroundColor: "#F1F8F3",
                  }}
                  onClick={() => handleDocumentClick(document._id)}
                >
                  📄 {document.name}
                </div>
              </li>
            ))}
            {folder.subFolders.map((subFolder) => renderFolderTree(subFolder))}
          </ul>
        )}
      </li>
    );
  };

  const renderRootDocuments = () =>
    structure?.rootDocuments.map((document) => (
      <li key={document._id} style={styles.treeNode}>
        <div
          style={{
            ...styles.treeItem,
            backgroundColor: "#F1F8F3",
          }}
          onClick={() => handleDocumentClick(document._id)}
        >
          📄 {document.name}
        </div>
      </li>
    ));

  const renderRootFolders = () =>
    structure?.folders.map((folder) => renderFolderTree(folder));

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
    treeList: {
      listStyle: "none",
      paddingLeft: "20px",
    },
    treeItem: {
      padding: "10px 15px",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
    },
    addButton: {
      marginLeft: "10px",
      backgroundColor: "#00B37E",
      color: "#fff",
      border: "none",
      padding: "5px 10px",
      borderRadius: "5px",
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
    },
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={styles.pageContainer}>
      <div style={styles.header}>
        <div style={styles.projectName}>{project?.name}</div>
      </div>
      <ul style={styles.treeList}>
        {renderRootFolders()}
        {renderRootDocuments()}
      </ul>
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
            />
            <button onClick={handleFormSubmit}>Submit</button>
            <button onClick={handlePopupClose}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetailsPage;
