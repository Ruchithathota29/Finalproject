// pages/index.js
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../styles/home.module.css";

export default function Home() {
  const [applications, setApplications] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/applications")
      .then((response) => {
        setApplications(response.data);
      })
      .catch((error) => {
        console.error("Error fetching applications:", error);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/applications/${id}`);
      setApplications(
        applications.filter((application) => application._id !== id)
      );
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Job Application Tracker</h1>
      <div className={styles["application-list"]}>
        {applications.map((application) => (
          <div key={application._id} className={styles["application-item"]}>
            <h3>
              {application.position} at {application.company}
            </h3>
            <p>Status: {application.status}</p>
            <p>
              Applied on:{" "}
              {new Date(application.applicationDate).toLocaleDateString()}
            </p>
            <button onClick={() => router.push(`/edit/${application._id}`)}>
              Edit
            </button>
            <button onClick={() => handleDelete(application._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
      <div>
        <button onClick={() => router.push("/add")}>Add New Application</button>
      </div>
    </div>
  );
}
