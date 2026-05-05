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
    resumeVersion: "software developer",
    notes: ""
  };

  const [job, setJob] = useState(initialState);

  // ✅ Load selected job safely (important fix)
  useEffect(() => {
    if (selectedJob) {
      setJob({
        ...selectedJob,
        id: selectedJob.id,
        status: selectedJob.status?.toUpperCase() || "APPLIED"
      });
    }
  }, [selectedJob]);

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ IMPORTANT: force correct enum format before sending to backend
    const payload = {
      ...job,
      status: job.status?.toUpperCase()
    };

    try {
      let res;

      if (job.id) {
        res = await API.put(`/jobs/${job.id}`, payload);

        setJobs((prev) =>
          prev.map((j) => (j.id === job.id ? res.data : j))
        );
      } else {
        res = await API.post("/jobs", payload);

        setJobs((prev) => [...prev, res.data]);
      }

      setJob(initialState);
      clearSelection();

    } catch (err) {
      console.error(err);
      alert("Error saving job (check status value)");
    }
  };

  return (
    <form className="add-job-card" onSubmit={handleSubmit}>

      <h2 className="form-title">
        {job.id ? "Update Application" : "Add New Job Application"}
      </h2>

      {/* SECTION 1 */}
      <div className="form-section">
        <h4>Company Details</h4>
        <div className="form-grid">
          <input className="input" name="companyName" value={job.companyName} onChange={handleChange} placeholder="Company Name" />
          <input className="input" name="location" value={job.location} onChange={handleChange} placeholder="Location" />
        </div>
      </div>

      {/* SECTION 2 */}
      <div className="form-section">
        <h4>Job Details</h4>
        <div className="form-grid">
          <input className="input" name="role" value={job.role} onChange={handleChange} placeholder="Job Role" />
          <input className="input" name="jobLink" value={job.jobLink} onChange={handleChange} placeholder="Job Link" />
        </div>
      </div>

      {/* SECTION 3 */}
      <div className="form-section">
        <h4>Application Info</h4>
        <div className="form-grid">

          <select className="input" name="status" value={job.status} onChange={handleChange}>
            <option value="APPLIED">Applied</option>
            <option value="SHORTLISTED">Shortlisted</option>
            <option value="INTERVIEW">Interview</option>
            <option value="OFFER">Offer</option>
            <option value="REJECTED">Rejected</option>
          </select>

          <input className="input" type="date" name="appliedDate" value={job.appliedDate} onChange={handleChange} />

          <input className="input" name="resumeVersion" value={job.resumeVersion} onChange={handleChange} placeholder="Resume Version" />
        </div>
      </div>

      {/* SECTION 4 */}
      <div className="form-section">
        <h4>Notes</h4>
        <textarea className="input full" name="notes" value={job.notes} onChange={handleChange} placeholder="Add notes..." />
      </div>

      {/* BUTTON */}
      <div className="form-actions">
        <button className="btn-primary">
          {job.id ? "Update Job" : "Add Job"}
        </button>
      </div>

    </form>
  );
}

export default AddJob;