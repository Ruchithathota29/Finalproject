// pages/add.js
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../styles/add.module.css";

export default function AddApplication() {
  const router = useRouter();
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("Applied");
  const [applicationDate, setApplicationDate] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newApplication = {
        company,
        position,
        status,
        applicationDate,
        followUpDate,
        notes,
      };

      await axios.post(
        "http://localhost:5001/api/applications",
        newApplication
      );

      // Redirect to the homepage after successful submission
      router.push("/");
    } catch (error) {
      console.error("Error adding new job application:", error);
    }
  };

  return (
    <div className={styles["add-form"]}>
      <h1>Add New Job Application</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Company:</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Position:</label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <br />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="Applied">Applied</option>
            <option value="Interview Scheduled">Interview Scheduled</option>
            <option value="Offer Received">Offer Received</option>
          </select>
        </div>
        <div>
          <label>Application Date:</label>
          <input
            type="date"
            value={applicationDate}
            onChange={(e) => setApplicationDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Follow-up Date:</label>
          <input
            type="date"
            value={followUpDate}
            onChange={(e) => setFollowUpDate(e.target.value)}
          />
        </div>
        <div>
          <label>Notes:</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Add Application</button>
      </form>
    </div>
  );
}
