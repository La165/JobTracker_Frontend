import { useState } from "react";
import API from "../services/api";
import "./JobList.css";

function JobList({ jobs, setJobs, onEdit }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [editJobId, setEditJobId] = useState(null);

  const [editData, setEditData] = useState({
    companyName: "",
    role: "",
    status: "APPLIED",
  });

  const deleteJob = async (id) => {
    await API.delete(`/jobs/${id}`);
    setJobs((prev) => prev.filter((j) => j.id !== id));
  };

  const startEdit = (job) => {
    setEditJobId(job.id);
    setEditData({
      companyName: job.companyName,
      role: job.role,
      status: job.status,
    });

    onEdit(job);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveEdit = async (id) => {
    try {
      const res = await API.put(`/jobs/${id}`, editData);

      setJobs((prev) =>
        prev.map((j) => (j.id === id ? res.data : j))
      );

      setEditJobId(null);
      onEdit(null);

    } catch {
      alert("Update failed");
    }
  };

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("ALL");
  };

  const filteredJobs = jobs.filter((job) => {
    return (
      job.companyName.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter === "ALL" || job.status === statusFilter)
    );
  });

  return (
    <div className="joblist-container">

      <h2 className="title">Job Tracker</h2>

      <div className="filter-bar">
        <input
          className="input"
          placeholder="Search company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="input"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="ALL">All</option>
          <option value="APPLIED">Applied</option>
          <option value="INTERVIEW">Interview</option>
          <option value="OFFER">Offer</option>
          <option value="REJECTED">Rejected</option>
        </select>

        <button className="btn-secondary" onClick={resetFilters}>
          Reset
        </button>
      </div>

      <div className="job-grid">
        {filteredJobs.map((job) => (
          <div key={job.id} className="job-card">

            {editJobId === job.id ? (
              <div className="edit-box">

  <div className="edit-row">
    <input
      className="input"
      name="companyName"
      value={editData.companyName}
      onChange={handleEditChange}
      placeholder="Company"
    />

    <input
      className="input"
      name="role"
      value={editData.role}
      onChange={handleEditChange}
      placeholder="Role"
    />

    <select
      className="input"
      name="status"
      value={editData.status}
      onChange={handleEditChange}
    >
      <option value="APPLIED">Applied</option>
      <option value="INTERVIEW">Interview</option>
      <option value="OFFER">Offer</option>
      <option value="REJECTED">Rejected</option>
    </select>
  </div>

  <div className="edit-actions">
    <button
      className="btn-primary"
      onClick={() => saveEdit(job.id)}
    >
      Save
    </button>
  </div>

</div>
            ) : (
              <>
                <div className="job-info">
                  <h3>{job.companyName}</h3>
                  <p>{job.role}</p>

                  <span className={`badge ${job.status}`}>
                    {job.status}
                  </span>
                </div>

                <div className="actions">
                  <button
                    className="btn-edit"
                    onClick={() => startEdit(job)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn-danger"
                    onClick={() => deleteJob(job.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}

          </div>
        ))}
      </div>

    </div>
  );
}

export default JobList;