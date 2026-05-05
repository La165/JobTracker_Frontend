import { useState, useEffect } from "react";
import API from "../services/api";
import "./AddJob.css";

function AddJob({ selectedJob, setJobs, clearSelection }) {
  const initialState = {
    companyName: "",
    role: "",
    jobLink: "",
    location: "",
    status: "APPLIED",
    appliedDate: "",
    resumeVersion: "software developer",   // ✅ default added
    notes: ""
  };

  const [job, setJob] = useState(initialState);

  useEffect(() => {
    if (selectedJob) {
      setJob({
        ...selectedJob,
        id: selectedJob.id,
      });
    }
  }, [selectedJob]);

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res;

      if (job.id) {
        res = await API.put(`/jobs/${job.id}`, job);

        setJobs((prev) =>
          prev.map((j) => (j.id === job.id ? res.data : j))
        );
      } else {
        res = await API.post("/jobs", job);
        setJobs((prev) => [...prev, res.data]);
      }

      setJob(initialState);
      clearSelection();

    } catch (err) {
      alert("Error saving job");
    }
  };

  return (
  <form className="add-job-content" onSubmit={handleSubmit}>

    <h3 className="card-title">
      {job.id ? "Update Job" : "Add New Job"}
    </h3>

    {/* INPUT ROW */}
    <div className="form-row">

      <input
        className="input"
        name="companyName"
        value={job.companyName}
        onChange={handleChange}
        placeholder="Company Name"
      />

      <input
        className="input"
        name="role"
        value={job.role}
        onChange={handleChange}
        placeholder="Job Role"
      />

      <input
        className="input"
        name="jobLink"
        value={job.jobLink}
        onChange={handleChange}
        placeholder="Job Link"
      />

      <input
        className="input"
        name="location"
        value={job.location}
        onChange={handleChange}
        placeholder="Location"
      />

      <select
        className="input"
        name="status"
        value={job.status}
        onChange={handleChange}
      >
        <option value="APPLIED">Applied</option>
        <option value="SHORTLISTED">Shortlisted</option>
        <option value="INTERVIEW">Interview</option>
        <option value="OFFER">Offer</option>
        <option value="REJECTED">Rejected</option>
      </select>

      <input
        className="input"
        type="date"
        name="appliedDate"
        value={job.appliedDate}
        onChange={handleChange}
      />

      <input
        className="input"
        name="resumeVersion"
        value={job.resumeVersion}
        onChange={handleChange}
        placeholder="Resume Version"
      />

      <textarea
        className="input"
        name="notes"
        value={job.notes}
        onChange={handleChange}
        placeholder="Notes"
      />

    </div>

    {/* BUTTON ROW */}
    <div className="form-actions">
      <button className="btn-primary">
        {job.id ? "Update Job" : "Add Job"}
      </button>
    </div>

  </form>
);
}

export default AddJob;