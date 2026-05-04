import { useState, useEffect } from "react";
import API from "../services/api";
import "./AddJob.css";

function AddJob({ selectedJob, setJobs, clearSelection }) {
  const initialState = {
    companyName: "",
    role: "",
    status: "APPLIED",
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
  // <div className="job-card add-job-card">

    <form className="add-job-content" onSubmit={handleSubmit}>

      <h3 className="card-title">
        {job.id ? "Update Job" : "Add New Job"}
      </h3>

      {/* ROW 1 */}
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

        <select
          className="input"
          name="status"
          value={job.status}
          onChange={handleChange}
        >
          <option value="APPLIED">Applied</option>
          <option value="INTERVIEW">Interview</option>
          <option value="OFFER">Offer</option>
          <option value="REJECTED">Rejected</option>
        </select>
  

      {/* BUTTON ROW */}
      <div className="form-actions">
        <button className="btn-primary">
          {job.id ? "Update Job" : "Add Job"}
        </button>
      </div>
      </div>

    </form>
  
);
}

export default AddJob;