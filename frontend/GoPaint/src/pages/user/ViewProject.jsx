import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "../../components/user/Header";
import Footer from "../../components/user/Footer";
import axios from "axios";

export default function ViewProject() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    budget: "",
    timeline: "",
    rooms: [],
    description: "",
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/projects/${projectId}`);
        setProject(response.data);
        setFormData({
          title: response.data.title,
          location: response.data.location,
          budget: response.data.budget,
          timeline: response.data.timeline,
          rooms: response.data.rooms || [],
          description: response.data.description,
        });
      } catch (err) {
        console.error("Failed to fetch project", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [projectId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoomsChange = (e) => {
    const value = e.target.value;
    const rooms = value.split(",").map((room) => room.trim()).filter((room) => room);
    setFormData((prev) => ({ ...prev, rooms }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      await axios.put(`http://localhost:8080/api/projects/${projectId}`, {
        ...formData,
        userId: parseInt(userId),
      });
      const response = await axios.get(`http://localhost:8080/api/projects/${projectId}`);
      setProject(response.data);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update project", err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await axios.delete(`http://localhost:8080/api/projects/${projectId}`);
        navigate("/user-dashboard");
      } catch (err) {
        console.error("Failed to delete project", err);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-[#F3F4F6]">
        <Header forceScrolled />
        <main className="flex-1 pt-20">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <p className="text-center py-10 text-slate-500">Loading project...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col bg-[#F3F4F6]">
        <Header forceScrolled />
        <main className="flex-1 pt-20">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <p className="text-center py-10 text-slate-500">Project not found!</p>
            <Link
              to="/user-dashboard"
              className="mx-auto flex w-fit items-center justify-center gap-1.5 rounded-lg bg-[#FF8022] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e8721a]"
            >
              Back to Dashboard
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F3F4F6]">
      <Header forceScrolled />
      <main className="flex-1 pt-20">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <nav className="mb-5 text-sm text-slate-500" aria-label="Breadcrumb">
            <Link to="/" className="transition hover:text-[#FF8022]">
              Home
            </Link>
            <span className="mx-2 text-slate-300">/</span>
            <Link to="/user-dashboard" className="transition hover:text-[#FF8022]">
              Dashboard
            </Link>
            <span className="mx-2 text-slate-300">/</span>
            <span className="font-medium text-slate-800">Project Details</span>
          </nav>

          <section className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm sm:p-6">
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                {isEditing ? (
                  <h2 className="font-heading text-lg font-bold text-slate-900">Edit Project</h2>
                ) : (
                  <div className="flex items-center gap-3">
                    <h2 className="font-heading text-lg font-bold text-slate-900">{project.title}</h2>
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                        project.status === "Completed"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-orange-50 text-[#FF8022] border-orange-200"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                )}
              </div>
              {!isEditing && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-neutral-50"
                  >
                    Edit Project
                  </button>
                  <button
                    onClick={handleDelete}
                    className="rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50"
                  >
                    Delete Project
                  </button>
                </div>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Project Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-[#FF8022] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-[#FF8022] focus:outline-none"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Budget</label>
                    <input
                      type="text"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-[#FF8022] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Timeline</label>
                    <input
                      type="text"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-[#FF8022] focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Rooms (comma separated)</label>
                  <input
                    type="text"
                    value={formData.rooms.join(", ")}
                    onChange={handleRoomsChange}
                    className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-[#FF8022] focus:outline-none"
                    placeholder="e.g., Living Room, Bedroom, Kitchen"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-[#FF8022] focus:outline-none"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="rounded-lg bg-[#FF8022] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e8721a]"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-neutral-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-slate-500">Location</p>
                    <p className="text-sm text-slate-800">{project.location || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500">Budget</p>
                    <p className="text-sm text-slate-800">{project.budget || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500">Timeline</p>
                    <p className="text-sm text-slate-800">{project.timeline || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500">Created At</p>
                    <p className="text-sm text-slate-800">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {project.rooms && project.rooms.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-slate-500 mb-2">Rooms</p>
                    <div className="flex flex-wrap gap-2">
                      {project.rooms.map((room, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-[#FF8022]"
                        >
                          {room}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {project.description && (
                  <div>
                    <p className="text-xs font-medium text-slate-500 mb-2">Description</p>
                    <p className="text-sm text-slate-800 whitespace-pre-wrap">{project.description}</p>
                  </div>
                )}
                <div className="pt-4">
                  <Link
                    to={`/view-bids/${project.id}`}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#FF8022] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e8721a]"
                  >
                    View Bids
                  </Link>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}