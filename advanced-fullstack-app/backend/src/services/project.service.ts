import { projectRepository } from "../repositories/project.repository.js";

export const projectService = {
  // ---------------------------------------------------------
  // Create project
  // ---------------------------------------------------------

  async createProject(
    name: string,
    description: string | undefined,
    ownerId: string,
  ) {
    const trimmedName = name.trim();
    const trimmedDescription = description?.trim() || null;

    if (!trimmedName) {
      throw new Error("Project name is required");
    }

    return projectRepository.create(
      trimmedName,
      trimmedDescription,
      ownerId,
    );
  },

  // ---------------------------------------------------------
  // Get all projects
  // ---------------------------------------------------------

  async getAllProjects() {
    return projectRepository.findAll();
  },

  // ---------------------------------------------------------
  // Get project by ID
  // ---------------------------------------------------------

  async getProjectById(id: string) {
    const project = await projectRepository.findById(id);

    if (!project) {
      throw new Error("Project not found");
    }

    return project;
  },

  // ---------------------------------------------------------
  // Update project
  // ---------------------------------------------------------

  async updateProject(
    id: string,
    name: string | undefined,
    description: string | undefined,
    ownerId: string,
  ) {
    const existingProject =
      await projectRepository.findById(id);

    if (!existingProject) {
      throw new Error("Project not found");
    }

    if (existingProject.owner_id !== ownerId) {
      throw new Error(
        "You are not authorized to update this project",
      );
    }

    const updatedName =
      name !== undefined
        ? name.trim()
        : existingProject.name;

    const updatedDescription =
      description !== undefined
        ? description.trim() || null
        : existingProject.description;

    if (!updatedName) {
      throw new Error("Project name is required");
    }

    return projectRepository.update(
      id,
      ownerId,
      updatedName,
      updatedDescription,
    );
  },

  // ---------------------------------------------------------
  // Delete project
  // ---------------------------------------------------------

  async deleteProject(
    id: string,
    ownerId: string,
  ) {
    const existingProject =
      await projectRepository.findById(id);

    if (!existingProject) {
      throw new Error("Project not found");
    }

    if (existingProject.owner_id !== ownerId) {
      throw new Error(
        "You are not authorized to delete this project",
      );
    }

    const deletedProject =
      await projectRepository.delete(
        id,
        ownerId,
      );

    if (!deletedProject) {
      throw new Error("Project could not be deleted");
    }

    return deletedProject;
  },

  // ---------------------------------------------------------
  // Get projects with their owners
  // ---------------------------------------------------------

  async getProjectsWithOwners() {
    return projectRepository.findProjectsWithOwners();
  },

  // ---------------------------------------------------------
  // Get members of a project
  // ---------------------------------------------------------

  async getProjectMembers(projectId: string) {
    const project =
      await projectRepository.findById(projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    return projectRepository.findMembers(projectId);
  },

  // ---------------------------------------------------------
  // Project summary
  // ---------------------------------------------------------

  async getProjectSummary() {
    return projectRepository.getProjectSummary();
  },

  // ---------------------------------------------------------
  // Projects with minimum number of tasks
  // ---------------------------------------------------------

  async getProjectsWithMinimumTasks(
    minimumTasks: number,
  ) {
    if (minimumTasks < 0) {
      throw new Error(
        "Minimum tasks cannot be negative",
      );
    }

    return projectRepository.findProjectsWithMinimumTasks(
      minimumTasks,
    );
  },

  // ---------------------------------------------------------
  // Search projects
  // ---------------------------------------------------------

  async searchProjects(searchTerm: string) {
    const trimmedSearchTerm =
      searchTerm.trim();

    if (!trimmedSearchTerm) {
      throw new Error(
        "Search term is required",
      );
    }

    return projectRepository.search(
      trimmedSearchTerm,
    );
  },

  // ---------------------------------------------------------
  // Pagination
  // ---------------------------------------------------------

  async getProjectsPaginated(
    page: number,
    limit: number,
  ) {
    if (page < 1) {
      throw new Error(
        "Page must be greater than or equal to 1",
      );
    }

    if (limit < 1 || limit > 100) {
      throw new Error(
        "Limit must be between 1 and 100",
      );
    }

    const projects =
      await projectRepository.findPaginated(
        page,
        limit,
      );

    const total =
      await projectRepository.countProjects();

    const totalPages =
      Math.ceil(total / limit);

    return {
      data: projects,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  },
};