import { taskRepository } from "../repositories/task.repository.js";

export const taskService = {
  // ---------------------------------------------------------
  // Get all tasks
  // ---------------------------------------------------------

  async getAllTasks() {
    return taskRepository.findAll();
  },

  // ---------------------------------------------------------
  // Get task by ID
  // ---------------------------------------------------------

  async getTaskById(id: string) {
    const task = await taskRepository.findById(id);

    if (!task) {
      throw new Error("Task not found");
    }

    return task;
  },

  // ---------------------------------------------------------
  // Get tasks with project and assigned user
  // ---------------------------------------------------------

  async getTasksWithDetails() {
    return taskRepository.findTasksWithDetails();
  },

  // ---------------------------------------------------------
  // Get tasks by project
  // ---------------------------------------------------------

  async getTasksByProject(projectId: string) {
    return taskRepository.findByProjectId(projectId);
  },

  // ---------------------------------------------------------
  // Get tasks assigned to user
  // ---------------------------------------------------------

  async getTasksByAssignedUser(userId: string) {
    return taskRepository.findByAssignedUser(userId);
  },

  // ---------------------------------------------------------
  // Filter by status and priority
  // ---------------------------------------------------------

  async getTasksByStatusAndPriority(
    status: string,
    priority: string,
  ) {
    return taskRepository.findByStatusAndPriority(
      status,
      priority,
    );
  },

  // ---------------------------------------------------------
  // Search tasks
  // ---------------------------------------------------------

  async searchTasks(searchTerm: string) {
    const trimmedSearchTerm = searchTerm.trim();

    if (!trimmedSearchTerm) {
      throw new Error("Search term is required");
    }

    return taskRepository.search(trimmedSearchTerm);
  },

  // ---------------------------------------------------------
  // Pagination
  // ---------------------------------------------------------

async getTasksPaginated(
  page: number,
  limit: number,
  userId: string,
) {
  if (page < 1) {
    throw new Error("Page must be greater than or equal to 1");
  }

  if (limit < 1 || limit > 100) {
    throw new Error("Limit must be between 1 and 100");
  }

  const tasks =
    await taskRepository.findPaginated(
      page,
      limit,
      userId,
    );

  const total =
    await taskRepository.countTasks(userId);

  const totalPages = Math.ceil(total / limit);

  return {
    data: tasks,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  };
},

  // ---------------------------------------------------------
  // Task status summary
  // ---------------------------------------------------------

  async getStatusSummary() {
    return taskRepository.getStatusSummary();
  },

  // ---------------------------------------------------------
  // Task priority summary
  // ---------------------------------------------------------

  async getPrioritySummary() {
    return taskRepository.getPrioritySummary();
  },

  // ---------------------------------------------------------
  // Tasks with comments
  // ---------------------------------------------------------

  async getTasksWithComments() {
    return taskRepository.findTasksWithComments();
  },

  // ---------------------------------------------------------
  // Projects with minimum tasks
  // ---------------------------------------------------------

  async getProjectsWithMinimumTasks(
    minimumTasks: number,
  ) {
    if (minimumTasks < 0) {
      throw new Error("Minimum tasks cannot be negative");
    }

    return taskRepository.findProjectsWithMinimumTasks(
      minimumTasks,
    );
  },

  async createTask(
  projectId: string,
  assignedTo: string | null,
  createdBy: string,
  title: string,
  description: string | null,
  status: string,
  priority: string,
  dueDate: string | null,
) {
  return taskRepository.create(
    projectId,
    assignedTo,
    createdBy,
    title,
    description,
    status,
    priority,
    dueDate,
  );
},

async updateTask(
  id: string,
  createdBy: string,
  assignedTo: string | null,
  title: string,
  description: string | null,
  status: string,
  priority: string,
  dueDate: string | null,
) {
  const task = await taskRepository.update(
    id,
    createdBy,
    assignedTo,
    title,
    description,
    status,
    priority,
    dueDate,
  );

  if (!task) {
    throw new Error(
      "Task not found or you are not authorized to update this task",
    );
  }

  return task;
},

async deleteTask(
  id: string,
  createdBy: string,
) {
  const task = await taskRepository.delete(
    id,
    createdBy,
  );

  if (!task) {
    throw new Error(
      "Task not found or you are not authorized to delete this task",
    );
  }

  return task;
},
};