import { useEffect, useState } from "react";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasksPaginated,
  searchTasks,
  updateTask,
} from "../api/taskApi";
import { getProjectsPaginated } from "../api/projectApi";
import { getUsers } from "../api/userApi";
import type { Task } from "../types/task.types";
import type { Project } from "../types/project.types";
import type { User } from "../types/user.types";
import { useAuthStore } from "../store/authStore";

const LIMIT = 6;

function Tasks() {
  const currentUser = useAuthStore((state) => state.user);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [modal, setModal] = useState<"create" | "edit" | "view" | null>(null);

  const [form, setForm] = useState({
    projectId: "",
    assignedTo: "",
    title: "",
    description: "",
    status: "TODO",
    priority: "MEDIUM",
    dueDate: "",
  });

  const loadTasks = async (currentPage = page) => {
    try {
      setLoading(true);
      setError("");

      const response = await getTasksPaginated(currentPage, LIMIT);

      setTasks(response.data);
      setTotal(response.pagination.total);
      setTotalPages(response.pagination.totalPages);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const loadFormData = async () => {
    try {
      const [projectResponse, userResponse] = await Promise.all([
        getProjectsPaginated(1, 100),
        getUsers(),
      ]);

      setProjects(projectResponse.data);
      setUsers(userResponse.data);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed to load projects or users",
      );
    }
  };

  useEffect(() => {
    loadTasks(page);
  }, [page]);

  useEffect(() => {
    loadFormData();
  }, []);

  const handleSearch = async () => {
    const query = search.trim();

    if (!query) {
      setSearching(false);
      setPage(1);
      await loadTasks(1);
      return;
    }

    try {
      setSearching(true);
      setLoading(true);
      setError("");

      const data = await searchTasks(query);

      setTasks(data);
      setTotal(data.length);
      setTotalPages(1);
    } catch (err: any) {
      setError(err.response?.data?.message || "Search failed");
    } finally {
      setLoading(false);
    }
  };

  const resetSearch = async () => {
    setSearch("");
    setSearching(false);
    setPage(1);
    await loadTasks(1);
  };

  const resetForm = () => {
    setForm({
      projectId: "",
      assignedTo: "",
      title: "",
      description: "",
      status: "TODO",
      priority: "MEDIUM",
      dueDate: "",
    });
  };

  const openCreate = () => {
    resetForm();
    setSelectedTask(null);
    setError("");
    setMessage("");
    setModal("create");
  };

  const openView = async (id: string) => {
    try {
      setError("");

      const task = await getTaskById(id);

      setSelectedTask(task);
      setModal("view");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load task");
    }
  };

const openEdit = (task: Task) => {
  setSelectedTask(task);

  setForm({
    projectId: task.project_id,
    assignedTo: task.assigned_to || "",
    title: task.title,
    description: task.description || "",
    status: task.status,
    priority: task.priority,
    dueDate: task.due_date ? task.due_date.substring(0, 10) : "",
  });

  setError("");
  setMessage("");
  setModal("edit");
};

  const closeModal = () => {
    if (saving) return;

    setModal(null);
    setSelectedTask(null);
    setError("");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const projectId = form.projectId.trim();
    const assignedTo = form.assignedTo || null;
    const title = form.title.trim();
    const description = form.description.trim();
    const status = form.status;
    const priority = form.priority;
    const dueDate = form.dueDate || null;

    if (!projectId) {
      setError("Please select a project");
      return;
    }

    if (title.length < 2) {
      setError("Task title must be at least 2 characters");
      return;
    }

    if (title.length > 200) {
      setError("Task title cannot exceed 200 characters");
      return;
    }

    if (description.length > 2000) {
      setError("Description cannot exceed 2000 characters");
      return;
    }

    if (!["TODO", "IN_PROGRESS", "DONE"].includes(status)) {
      setError("Please select a valid status");
      return;
    }

    if (!["LOW", "MEDIUM", "HIGH"].includes(priority)) {
      setError("Please select a valid priority");
      return;
    }

    try {
      setSaving(true);
      setError("");

      if (modal === "create") {
        await createTask(
          projectId,
          assignedTo,
          title,
          description,
          status,
          priority,
          dueDate,
        );

        setMessage("Task created successfully");
      } else if (modal === "edit" && selectedTask) {
        await updateTask(
          selectedTask.id,
          assignedTo,
          title,
          description,
          status,
          priority,
          dueDate,
        );

        setMessage("Task updated successfully");
      }

      setModal(null);
      setSelectedTask(null);
      resetForm();

      await loadTasks(page);
    } catch (err: any) {
      setError(err.response?.data?.message || "Operation failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (task: Task) => {
    if (!window.confirm(`Delete "${task.title}"?`)) return;

    try {
      setError("");
      setMessage("");

      await deleteTask(task.id);

      setMessage("Task deleted successfully");

      if (tasks.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        await loadTasks(page);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete task");
    }
  };

  const getStatusClass = (status: string) => {
    if (status === "DONE") {
      return "bg-green-50 text-green-700";
    }

    if (status === "IN_PROGRESS") {
      return "bg-blue-50 text-blue-700";
    }

    return "bg-slate-100 text-slate-700";
  };

  const getPriorityClass = (priority: string) => {
    if (priority === "HIGH") {
      return "bg-red-50 text-red-700";
    }

    if (priority === "LOW") {
      return "bg-green-50 text-green-700";
    }

    return "bg-amber-50 text-amber-700";
  };

const formatDueDate = (dueDate: string | null) => {
  if (!dueDate) return "Not set";

  const datePart = dueDate.substring(0, 10);

  const date = new Date(`${datePart}T00:00:00`);

  return Number.isNaN(date.getTime()) ? "Not set" : date.toLocaleDateString();
};

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Tasks</h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage tasks, assignments, status and priorities.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
        >
          + Create Task
        </button>
      </div>

      {message && (
        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          {message}
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            placeholder="Search tasks..."
            className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />

          <div className="flex gap-2">
            <button
              onClick={handleSearch}
              className="flex-1 rounded-xl bg-slate-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-900 sm:flex-none"
            >
              Search
            </button>

            {searching && (
              <button
                onClick={resetSearch}
                className="flex-1 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 sm:flex-none"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-1">
        <p className="text-sm text-slate-500">
          {searching ? `${total} search result(s)` : `${total} task(s)`}
        </p>

        {!searching && totalPages > 1 && (
          <p className="text-sm text-slate-500">
            Page {page} of {totalPages}
          </p>
        )}
      </div>

      {loading ? (
        <div className="rounded-2xl bg-white p-10 text-center text-sm text-slate-500 shadow-sm">
          Loading tasks...
        </div>
      ) : tasks.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <p className="font-semibold text-slate-700">No tasks found</p>

          <p className="mt-1 text-sm text-slate-500">
            Create a task or try a different search.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {tasks.map((task) => (
            <article
              key={task.id}
              className="flex flex-col rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex-1">
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClass(
                      task.status,
                    )}`}
                  >
                    {task.status.replace("_", " ")}
                  </span>

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getPriorityClass(
                      task.priority,
                    )}`}
                  >
                    {task.priority}
                  </span>
                </div>

                <h3 className="mt-3 line-clamp-2 text-lg font-bold text-slate-800">
                  {task.title}
                </h3>

                <p className="mt-2 min-h-10 text-sm text-slate-500">
                  {task.description || "No description provided."}
                </p>

                <div className="mt-4 space-y-1 text-xs text-slate-400">
                  <p>
                    Project:{" "}
                    <span className="font-semibold text-slate-600">
                      {task.project_name || task.project_id}
                    </span>
                  </p>

                  <p>
                    Assigned to:{" "}
                    <span className="font-semibold text-slate-600">
                      {task.assigned_user_name || "Not assigned"}
                    </span>
                  </p>

                  {task.assigned_user_email && (
                    <p>{task.assigned_user_email}</p>
                  )}

                  <p>
                    Created by:{" "}
                    <span className="font-semibold text-slate-600">
                      {task.creator_name ||
                        (task.created_by === currentUser?.id
                          ? currentUser.name
                          : "Unknown")}
                    </span>
                  </p>

                  {task.due_date && (
                    <p>
                      Due:{" "}
                      <span className="font-semibold text-slate-600">
                        {formatDueDate(task.due_date)}
                      </span>
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  onClick={() => openView(task.id)}
                  className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                >
                  View
                </button>

                {task.created_by === currentUser?.id && (
                  <>
                    <button
                      onClick={() => openEdit(task)}
                      className="rounded-lg bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700 hover:bg-indigo-100"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(task)}
                      className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      {!searching && totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
          <button
            disabled={page === 1 || loading}
            onClick={() => setPage((current) => current - 1)}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          <span className="text-sm font-medium text-slate-600">
            {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages || loading}
            onClick={() => setPage((current) => current + 1)}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl">
            {modal === "view" && selectedTask ? (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-800">
                    Task Details
                  </h3>

                  <button
                    onClick={closeModal}
                    className="rounded-lg px-3 py-1 text-slate-500 hover:bg-slate-100"
                  >
                    ✕
                  </button>
                </div>

                <div className="mt-5 space-y-4">
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-400">
                      Title
                    </p>
                    <p className="mt-1 font-semibold text-slate-800">
                      {selectedTask.title}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-400">
                      Description
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      {selectedTask.description || "No description provided."}
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase text-slate-400">
                        Project
                      </p>
                      <p className="mt-1 text-sm text-slate-600">
                        {selectedTask.project_name || selectedTask.project_id}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase text-slate-400">
                        Status
                      </p>
                      <p className="mt-1 text-sm text-slate-600">
                        {selectedTask.status.replace("_", " ")}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase text-slate-400">
                        Priority
                      </p>
                      <p className="mt-1 text-sm text-slate-600">
                        {selectedTask.priority}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase text-slate-400">
                        Due Date
                      </p>
                      <p className="mt-1 text-sm text-slate-600">
                        {selectedTask.due_date
                          ? new Date(
                              `${selectedTask.due_date}T00:00:00`,
                            ).toLocaleDateString()
                          : "No due date"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-400">
                      Assigned To
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      {selectedTask.assigned_user_name || "Not assigned"}
                    </p>

                    {selectedTask.assigned_user_email && (
                      <p className="text-xs text-slate-400">
                        {selectedTask.assigned_user_email}
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-400">
                      Created By
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      {selectedTask.creator_name || "Unknown"}
                    </p>

                    {selectedTask.creator_email && (
                      <p className="text-xs text-slate-400">
                        {selectedTask.creator_email}
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-400">
                      Task ID
                    </p>
                    <p className="mt-1 break-all text-sm text-slate-600">
                      {selectedTask.id}
                    </p>
                  </div>
                </div>

                <button
                  onClick={closeModal}
                  className="mt-6 w-full rounded-xl bg-slate-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-900"
                >
                  Close
                </button>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-800">
                    {modal === "create" ? "Create Task" : "Edit Task"}
                  </h3>

                  <button
                    onClick={closeModal}
                    disabled={saving}
                    className="rounded-lg px-3 py-1 text-slate-500 hover:bg-slate-100 disabled:opacity-40"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                      Project
                    </label>

                    <select
                      value={form.projectId}
                      onChange={(e) =>
                        setForm((current) => ({
                          ...current,
                          projectId: e.target.value,
                        }))
                      }
                      disabled={modal === "edit"}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:bg-slate-100"
                    >
                      <option value="">Select project</option>

                      {projects.map((project) => (
                        <option key={project.id} value={project.id}>
                          {project.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                      Assigned To
                    </label>

                    <select
                      value={form.assignedTo}
                      onChange={(e) =>
                        setForm((current) => ({
                          ...current,
                          assignedTo: e.target.value,
                        }))
                      }
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    >
                      <option value="">Not assigned</option>

                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name} ({user.email})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                      Task Title
                    </label>

                    <input
                      value={form.title}
                      onChange={(e) =>
                        setForm((current) => ({
                          ...current,
                          title: e.target.value,
                        }))
                      }
                      maxLength={200}
                      placeholder="Enter task title"
                      className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                      Description
                    </label>

                    <textarea
                      value={form.description}
                      onChange={(e) =>
                        setForm((current) => ({
                          ...current,
                          description: e.target.value,
                        }))
                      }
                      maxLength={2000}
                      rows={4}
                      placeholder="Enter task description"
                      className="w-full resize-none rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />

                    <p className="mt-1 text-right text-xs text-slate-400">
                      {form.description.length}/2000
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                        Status
                      </label>

                      <select
                        value={form.status}
                        onChange={(e) =>
                          setForm((current) => ({
                            ...current,
                            status: e.target.value,
                          }))
                        }
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      >
                        <option value="TODO">TODO</option>
                        <option value="IN_PROGRESS">IN PROGRESS</option>
                        <option value="DONE">DONE</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                        Priority
                      </label>

                      <select
                        value={form.priority}
                        onChange={(e) =>
                          setForm((current) => ({
                            ...current,
                            priority: e.target.value,
                          }))
                        }
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      >
                        <option value="LOW">LOW</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="HIGH">HIGH</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                      Due Date
                    </label>

                    <input
                      type="date"
                      value={form.dueDate}
                      onChange={(e) =>
                        setForm((current) => ({
                          ...current,
                          dueDate: e.target.value,
                        }))
                      }
                      className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>

                  {error && (
                    <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                      {error}
                    </div>
                  )}

                  <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={closeModal}
                      disabled={saving}
                      className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={saving}
                      className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {saving
                        ? "Saving..."
                        : modal === "create"
                          ? "Create Task"
                          : "Save Changes"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default Tasks;
