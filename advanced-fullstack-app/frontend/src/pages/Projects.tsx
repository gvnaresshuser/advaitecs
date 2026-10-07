import { useEffect, useState } from "react";
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjectsPaginated,
  searchProjects,
  updateProject,
} from "../api/projectApi";
import type { Project } from "../types/project.types";
import { useAuthStore } from "../store/authStore";

const LIMIT = 6;

function Projects() {
  const currentUser = useAuthStore((state) => state.user);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
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
  const [form, setForm] = useState({ name: "", description: "" });
  
  const loadProjects = async (currentPage = page) => {
    try {
      setLoading(true);
      setError("");
      const response = await getProjectsPaginated(currentPage, LIMIT);
      setProjects(response.data);
      setTotal(response.pagination.total);
      setTotalPages(response.pagination.totalPages);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects(page);
  }, [page]);

  const handleSearch = async () => {
    const query = search.trim();

    if (!query) {
      setSearching(false);
      setPage(1);
      await loadProjects(1);
      return;
    }

    try {
      setSearching(true);
      setLoading(true);
      setError("");
      const data = await searchProjects(query);
      setProjects(data);
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
    await loadProjects(1);
  };

  const openCreate = () => {
    setForm({ name: "", description: "" });
    setSelectedProject(null);
    setError("");
    setMessage("");
    setModal("create");
  };

  const openView = async (id: string) => {
    try {
      setError("");
      const project = await getProjectById(id);
      setSelectedProject(project);
      setModal("view");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load project");
    }
  };

  const openEdit = (project: Project) => {
    setSelectedProject(project);
    setForm({
      name: project.name,
      description: project.description || "",
    });
    setError("");
    setMessage("");
    setModal("edit");
  };

  const closeModal = () => {
    if (saving) return;
    setModal(null);
    setSelectedProject(null);
    setError("");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const name = form.name.trim();
    const description = form.description.trim();

    if (name.length < 2) {
      setError("Project name must be at least 2 characters");
      return;
    }

    if (name.length > 150) {
      setError("Project name cannot exceed 150 characters");
      return;
    }

    if (description.length > 2000) {
      setError("Description cannot exceed 2000 characters");
      return;
    }

    try {
      setSaving(true);
      setError("");

      if (modal === "create") {
        await createProject(name, description);
        setMessage("Project created successfully");
      } else if (modal === "edit" && selectedProject) {
        await updateProject(selectedProject.id, name, description);
        setMessage("Project updated successfully");
      }

      setModal(null);
      setSelectedProject(null);
      setForm({ name: "", description: "" });
      await loadProjects(page);
    } catch (err: any) {
      setError(err.response?.data?.message || "Operation failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (project: Project) => {
    if (!window.confirm(`Delete "${project.name}"?`)) return;

    try {
      setError("");
      setMessage("");
      await deleteProject(project.id);
      setMessage("Project deleted successfully");

      if (projects.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        await loadProjects(page);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete project");
    }
  };

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Projects</h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage your projects and project information.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
        >
          + Create Project
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
            placeholder="Search projects..."
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
          {searching ? `${total} search result(s)` : `${total} project(s)`}
        </p>

        {!searching && totalPages > 1 && (
          <p className="text-sm text-slate-500">
            Page {page} of {totalPages}
          </p>
        )}
      </div>

      {loading ? (
        <div className="rounded-2xl bg-white p-10 text-center text-sm text-slate-500 shadow-sm">
          Loading projects...
        </div>
      ) : projects.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <p className="font-semibold text-slate-700">No projects found</p>
          <p className="mt-1 text-sm text-slate-500">
            Create a project or try a different search.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.id}
              className="flex flex-col rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex-1">
                <h3 className="line-clamp-2 text-lg font-bold text-slate-800">
                  {project.name}
                </h3>

                <p className="mt-2 min-h-10 text-sm text-slate-500">
                  {project.description || "No description provided."}
                </p>
                <p className="mt-2 min-h-10 text-sm text-slate-500">
                  {project.id || "No project ID provided."}
                </p>

                <div className="mt-4 space-y-1 text-xs text-slate-400">
                  <p>
                    Created by:{" "}
                    <span className="font-semibold text-slate-600">
                      {project.owner_name}
                    </span>
                  </p>
                  <p>{project.owner_email}</p>
                  <p>
                    Created: {new Date(project.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  onClick={() => openView(project.id)}
                  className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                >
                  View
                </button>

                {project.owner_id === currentUser?.id && (
                  <>
                    <button
                      onClick={() => openEdit(project)}
                      className="rounded-lg bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700 hover:bg-indigo-100"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(project)}
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
            {modal === "view" && selectedProject ? (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-800">
                    Project Details
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
                      Name
                    </p>
                    <p className="mt-1 font-semibold text-slate-800">
                      {selectedProject.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-400">
                      Description
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      {selectedProject.description ||
                        "No description provided."}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-400">
                      Owner ID
                    </p>
                    <p className="mt-1 break-all text-sm text-slate-600">
                      {selectedProject.owner_id}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-400">
                      Created
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      {new Date(selectedProject.created_at).toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-400">
                      Updated
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      {new Date(selectedProject.updated_at).toLocaleString()}
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
                    {modal === "create" ? "Create Project" : "Edit Project"}
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
                      Project Name
                    </label>
                    <input
                      value={form.name}
                      onChange={(e) =>
                        setForm((current) => ({
                          ...current,
                          name: e.target.value,
                        }))
                      }
                      maxLength={150}
                      placeholder="Enter project name"
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
                      rows={5}
                      placeholder="Enter project description"
                      className="w-full resize-none rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />
                    <p className="mt-1 text-right text-xs text-slate-400">
                      {form.description.length}/2000
                    </p>
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
                          ? "Create Project"
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

export default Projects;
