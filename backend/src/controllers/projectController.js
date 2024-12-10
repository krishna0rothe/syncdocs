const Project = require("../models/Project");
const Folder = require("../models/Folder");
const Document = require("../models/Document");


exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    // Validate required fields
    if (!name) {
      return res.status(400).json({ message: "Project name is required." });
    }

    // Get owner ID from req.user (set by authentication middleware)
    const ownerId = req.user.id;

    // Create the new project
    const newProject = new Project({
      name,
      description: description || "", // Default to empty string if no description
      owner: ownerId,
      teamMembers: [], // Empty array for team members
      folders: [], // Empty array for folders
      documents: [], // Empty array for documents
    });

    // Save the project to the database
    const savedProject = await newProject.save();

    // Respond with the created project details
    res.status(201).json({
      message: "Project created successfully.",
      project: savedProject,
    });
  } catch (error) {
    console.error("Error creating project:", error);

    // Handle duplicate project name error
    if (error.code === 11000) {
      return res.status(409).json({ message: "Project name must be unique." });
    }

    res.status(500).json({ message: "Internal server error." });
  }
};


exports.createFolder = async (req, res) => {
  try {
    const { name, parent = null, project } = req.body;

    // Validate required fields
    if (!name || !project) {
      return res
        .status(400)
        .json({ message: "Folder name and project ID are required." });
    }

    // Validate project ID
    const existingProject = await Project.findById(project);
    if (!existingProject) {
      return res.status(404).json({ message: "Project not found." });
    }

    let parentFolder = null;

    // Validate parent folder ID if provided
    if (parent) {
      parentFolder = await Folder.findById(parent);
      if (!parentFolder) {
        return res.status(404).json({ message: "Parent folder not found." });
      }

      // Ensure the parent folder belongs to the same project
      if (String(parentFolder.project) !== project) {
        return res
          .status(400)
          .json({
            message: "Parent folder does not belong to the specified project.",
          });
      }
    }

    // Create the new folder
    const newFolder = new Folder({
      name,
      parent,
      project,
    });

    const savedFolder = await newFolder.save();

    // If the folder is nested, add it to the parent's `subFolders` field
    if (parentFolder) {
      parentFolder.subFolders.push(savedFolder._id);
      await parentFolder.save();
    } else {
      // If it's a root-level folder, add it to the project's `folders` field
      existingProject.folders.push(savedFolder._id);
      await existingProject.save();
    }

    res.status(201).json({
      message: "Folder created successfully.",
      folder: savedFolder,
    });
  } catch (error) {
    console.error("Error creating folder:", error);
    res.status(500).json({ message: "Failed to create folder." });
  }
};


exports.createDocument = async (req, res) => {
  try {
    const { name, content = "", folder = null, project } = req.body;

    // Validate required fields
    if (!name || !project) {
      return res
        .status(400)
        .json({ message: "Document name and project ID are required." });
    }

    // Validate project ID
    const existingProject = await Project.findById(project);
    if (!existingProject) {
      return res.status(404).json({ message: "Project not found." });
    }

    let parentFolder = null;

    // Validate folder ID if provided
    if (folder) {
      parentFolder = await Folder.findById(folder);
      if (!parentFolder) {
        return res.status(404).json({ message: "Folder not found." });
      }

      // Ensure the folder belongs to the same project
      if (String(parentFolder.project) !== project) {
        return res
          .status(400)
          .json({
            message: "Folder does not belong to the specified project.",
          });
      }
    }

    // Create the new document
    const newDocument = new Document({
      name,
      content,
      folder: folder || null,
      project,
      lastUpdatedBy: req.user.id, // Assuming `req.user.id` has the user ID
    });

    const savedDocument = await newDocument.save();

    if (parentFolder) {
      // If the document is within a folder, add it to the folder's `documents` field
      parentFolder.documents.push(savedDocument._id);
      await parentFolder.save();
    } else {
      // If it's a root-level document, add it to the project's `documents` field
      existingProject.documents.push(savedDocument._id);
      await existingProject.save();
    }

    res.status(201).json({
      message: "Document created successfully.",
      document: savedDocument,
    });
  } catch (error) {
    console.error("Error creating document:", error);
    res.status(500).json({ message: "Failed to create document." });
  }
};


exports.getProjectDetails = async (req, res) => {
  try {
    const projectId = req.params.projectId;

    // Validate that the project exists and belongs to the user
    const project = await Project.findById(projectId).populate("owner", "_id");
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }
    if (project.owner._id.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized access to this project." });
    }

    // Fetch root-level folders and documents
    const rootFolders = await Folder.find({
      project: projectId,
      parent: null,
    }).exec();
    const rootDocuments = await Document.find({
      project: projectId,
      folder: null,
    })
      .select("name _id")
      .exec();

    // Helper function to build the hierarchical structure of folders and documents
    const buildFolderHierarchy = async (folder) => {
      const childFolders = await Folder.find({ parent: folder._id }).exec();
      const documents = await Document.find({ folder: folder._id })
        .select("name _id")
        .exec();

      const children = await Promise.all(
        childFolders.map(async (childFolder) => {
          return await buildFolderHierarchy(childFolder); // Recursively fetch subfolders
        })
      );

      return {
        _id: folder._id,
        name: folder.name,
        documents,
        subFolders: children,
      };
    };

    // Build the folder hierarchy
    const foldersWithHierarchy = await Promise.all(
      rootFolders.map(async (folder) => {
        return await buildFolderHierarchy(folder);
      })
    );

    // Construct the response
    const response = {
      project: {
        id: project._id,
        name: project.name,
        description: project.description,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
      },
      structure: {
        folders: foldersWithHierarchy, // Nested folders and documents
        rootDocuments, // Documents not in any folder
      },
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching project details:", error);
    res.status(500).json({ message: "Failed to fetch project details." });
  }
};