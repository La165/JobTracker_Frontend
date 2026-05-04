import { useEffect, useState } from "react";
import AddJob from "../components/AddJob";
import JobList from "../components/JobList";
import API from "../services/api";
import "./Dashboard.css";

function Dashboard({ setLoggedIn }) {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs");
      setJobs(res.data);
    } catch {
      alert("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  return (
    <div className="dashboard-container">

      <div className="dashboard-header">
        <h1>Job Tracker</h1>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <AddJob
        selectedJob={selectedJob}
        setJobs={setJobs}
        clearSelection={() => setSelectedJob(null)}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <JobList
          jobs={jobs}
          setJobs={setJobs}
          onEdit={setSelectedJob}
        />
      )}
    </div>
  );
}

export default Dashboard;